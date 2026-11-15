"use client";

import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { blogCategories, blogPosts } from "@/data";
import { getAuthUserEmail, isAllowedBlogAdminEmail } from "@/lib/blog-admin";
import { formatBlogDate, slugify } from "@/lib/blog-storage";
import {
  createFirebaseBlogPost,
  deleteFirebaseBlogPost,
  fetchFirebaseBlogPosts,
  seedStaticBlogsToFirebase,
  updateFirebaseBlogPost,
} from "@/lib/blog-firestore";
import { getFirebaseAuth, getGoogleProvider, isFirebaseConfigured } from "@/lib/firebase";
import type { BlogPost } from "@/types";
import { brand } from "@/lib/brand";

type BlogAdminPanelProps = {
  open: boolean;
  onClose: () => void;
  onPostsChange: (posts: BlogPost[]) => void;
};

const emptyForm = {
  title: "",
  excerpt: "",
  category: blogCategories[0]?.slug ?? "car-rental-tips",
  author: "",
  image: "",
  content: "",
  readTime: "5 min read",
};

function postToForm(post: BlogPost) {
  return {
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    author: post.author,
    image: post.image,
    content: post.content.join("\n\n"),
    readTime: post.readTime,
  };
}

export function BlogAdminPanel({ open, onClose, onPostsChange }: BlogAdminPanelProps) {
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [loginError, setLoginError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [formError, setFormError] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [viewPost, setViewPost] = useState<BlogPost | null>(null);
  const [postsLoading, setPostsLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open || !isFirebaseConfigured()) {
      setLoggedIn(false);
      setUserEmail("");
      return;
    }

    const unsub = onAuthStateChanged(getFirebaseAuth(), async (user) => {
      if (!user) {
        setLoggedIn(false);
        setUserEmail("");
        return;
      }

      const email = getAuthUserEmail(user);
      if (!email) {
        await signOut(getFirebaseAuth());
        setLoggedIn(false);
        setUserEmail("");
        setLoginError("Google did not return an email. Allow email permission and try again.");
        return;
      }

      if (!isAllowedBlogAdminEmail(email)) {
        await signOut(getFirebaseAuth());
        setLoggedIn(false);
        setUserEmail("");
        setLoginError(
          `Signed in as ${email}, but this account is not allowed. Allowed: ${["ulainnoor957@gmail.com", "developerx.org@gmail.com", "signaturesrentacar@gmail.com", "xfirebasc@gmail.com"].join(", ")}`,
        );
        return;
      }

      setLoggedIn(true);
      setUserEmail(email);
      setLoginError("");
    });
    return () => unsub();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setForm(emptyForm);
    setEditingSlug(null);
    setFormError("");
    setViewPost(null);
    setGoogleLoading(false);
  }, [open]);

  useEffect(() => {
    if (!open || !loggedIn) return;

    let cancelled = false;
    setPostsLoading(true);
    setFormError("");

    (async () => {
      try {
        let items = await fetchFirebaseBlogPosts();
        if (!cancelled && items.length === 0) {
          items = await seedStaticBlogsToFirebase(blogPosts);
        }
        if (cancelled) return;
        setPosts(items);
        onPostsChange(items);
      } catch (error) {
        if (cancelled) return;
        setPosts([]);
        const code =
          typeof error === "object" && error !== null && "code" in error
            ? String((error as { code: string }).code)
            : "";
        setFormError(
          code === "permission-denied"
            ? "Firestore permission denied. Publish blogs rules in Firebase Console → Firestore → Rules."
            : "Could not load blogs from Firebase. Create Firestore Database and publish rules.",
        );
      } finally {
        if (!cancelled) setPostsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reload when panel opens or login changes
  }, [open, loggedIn]);

  async function handleSeedBlogs() {
    setSeeding(true);
    setFormError("");
    try {
      const items = await seedStaticBlogsToFirebase(blogPosts);
      setPosts(items);
      onPostsChange(items);
    } catch {
      setFormError("Failed to sync site blogs to Firebase. Check Firestore rules.");
    } finally {
      setSeeding(false);
    }
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!mounted || !open) return null;

  function refreshPosts(next: BlogPost[]) {
    setPosts(next);
    onPostsChange(next);
  }

  function update<K extends keyof typeof emptyForm>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleGoogleLogin() {
    setLoginError("");
    if (!isFirebaseConfigured()) {
      setLoginError("Firebase is not configured.");
      return;
    }

    setGoogleLoading(true);
    try {
      const result = await signInWithPopup(getFirebaseAuth(), getGoogleProvider());
      const email = getAuthUserEmail(result.user);

      if (!email) {
        await signOut(getFirebaseAuth());
        setLoginError("Google did not return an email. Allow email permission and try again.");
        return;
      }

      if (!isAllowedBlogAdminEmail(email)) {
        await signOut(getFirebaseAuth());
        setLoginError(
          `Signed in as ${email}, but this account is not allowed. Choose developerx.org@gmail.com (or another authorized admin account).`,
        );
        return;
      }

      setLoggedIn(true);
      setUserEmail(email);
      setLoginError("");
    } catch (error) {
      const code =
        typeof error === "object" && error !== null && "code" in error
          ? String((error as { code: string }).code)
          : "";
      if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") {
        return;
      }
      if (code === "auth/unauthorized-domain") {
        setLoginError("Add this site domain in Firebase Auth → Settings → Authorized domains.");
        return;
      }
      setLoginError(code ? `Google sign-in failed (${code}).` : "Google sign-in failed.");
    } finally {
      setGoogleLoading(false);
    }
  }

  async function handleLogout() {
    try {
      if (isFirebaseConfigured()) {
        await signOut(getFirebaseAuth());
      }
    } catch {
      // ignore
    }
    setLoggedIn(false);
    setUserEmail("");
    setForm(emptyForm);
    setEditingSlug(null);
    setViewPost(null);
  }

  function buildPostFromForm(slug: string): BlogPost | null {
    const title = form.title.trim();
    const excerpt = form.excerpt.trim();
    const author = form.author.trim() || "Best Carz Team";
    const image = form.image.trim();
    const content = form.content
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (!title || !excerpt || !image || content.length === 0) {
      setFormError("Please fill title, excerpt, image link, and at least one content paragraph.");
      return null;
    }

    try {
      // eslint-disable-next-line no-new
      new URL(image);
    } catch {
      setFormError("Image must be a valid link (https://...).");
      return null;
    }

    return {
      slug,
      title,
      category: form.category,
      date: formatBlogDate(),
      excerpt,
      image,
      author,
      readTime: form.readTime.trim() || "5 min read",
      content,
    };
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFormError("");

    if (editingSlug) {
      const post = buildPostFromForm(editingSlug);
      if (!post) return;
      setSaving(true);
      try {
        const next = await updateFirebaseBlogPost(post);
        refreshPosts(next);
        setForm(emptyForm);
        setEditingSlug(null);
      } catch {
        setFormError("Failed to update blog in Firebase. Check Firestore rules.");
      } finally {
        setSaving(false);
      }
      return;
    }

    const baseSlug = slugify(form.title.trim()) || `post-${Date.now()}`;
    const slug = `${baseSlug}-${Date.now().toString().slice(-5)}`;
    const post = buildPostFromForm(slug);
    if (!post) return;

    setSaving(true);
    try {
      const next = await createFirebaseBlogPost(post);
      refreshPosts(next);
      setForm(emptyForm);
    } catch {
      setFormError("Failed to save blog in Firebase. Check Firestore rules.");
    } finally {
      setSaving(false);
    }
  }

  function startEdit(post: BlogPost) {
    setEditingSlug(post.slug);
    setForm(postToForm(post));
    setViewPost(null);
    setFormError("");
  }

  function cancelEdit() {
    setEditingSlug(null);
    setForm(emptyForm);
    setFormError("");
  }

  async function handleDelete(slug: string) {
    if (!window.confirm("Delete this blog post?")) return;
    setSaving(true);
    try {
      const next = await deleteFirebaseBlogPost(slug);
      refreshPosts(next);
      if (editingSlug === slug) cancelEdit();
      if (viewPost?.slug === slug) setViewPost(null);
    } catch {
      setFormError("Failed to delete blog in Firebase.");
    } finally {
      setSaving(false);
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button type="button" className="absolute inset-0 bg-primary/70 backdrop-blur-sm" aria-label="Close" onClick={onClose} />

      <div
        className={`relative z-10 flex max-h-[94vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl ${
          loggedIn ? "max-w-6xl" : "max-w-md"
        }`}
      >
        <div className="flex items-center justify-between border-b border-primary/8 px-5 py-4 sm:px-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary">Admin</p>
            <h2 id={titleId} className="font-heading text-xl font-semibold text-primary sm:text-2xl">
              {loggedIn ? "Manage Blog Posts" : "Admin Login"}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {loggedIn ? (
              <div className="flex items-center gap-2">
                {userEmail ? (
                  <span className="hidden max-w-[160px] truncate text-[11px] text-muted sm:inline">{userEmail}</span>
                ) : null}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-xl border border-primary/10 px-3 py-2 text-xs font-semibold text-primary transition hover:bg-[#f8f9fa]"
                >
                  Logout
                </button>
              </div>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/10 text-primary transition hover:bg-[#f8f9fa]"
              aria-label="Close"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        {!loggedIn ? (
          <div className="mx-auto w-full max-w-md px-5 py-10 sm:px-6 sm:py-14">
            <p className="mb-6 text-sm text-muted">
              Admin access is limited to authorized Google accounts. Sign in with an allowed account only.
            </p>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="inline-flex w-full items-center justify-center gap-3 rounded-xl border border-primary/15 bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:bg-[#f8f9fa] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.5-.4-3.5z" />
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.2 19 12 24 12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.3 44 24 44z" />
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l.1.1 6.3 5.3C39.2 37.3 44 33 44 24c0-1.3-.1-2.5-.4-3.5z" />
              </svg>
              {googleLoading ? "Connecting..." : "Continue with Google"}
            </button>

            {loginError ? <p className="mt-4 text-sm font-medium text-red-600">{loginError}</p> : null}
          </div>
        ) : (
          <div className="grid min-h-0 flex-1 lg:grid-cols-2">
            <div className="min-h-0 overflow-y-auto border-b border-primary/8 px-5 py-5 sm:px-6 lg:border-b-0 lg:border-r">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="font-heading text-lg font-semibold text-primary">
                  {editingSlug ? "Edit Blog" : "Add Blog"}
                </h3>
                {editingSlug ? (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="text-xs font-semibold text-secondary hover:underline"
                  >
                    Cancel edit
                  </button>
                ) : null}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Title</span>
                  <input
                    value={form.title}
                    onChange={(e) => update("title", e.target.value)}
                    className="w-full rounded-xl border border-primary/10 bg-[#f8f9fa] px-4 py-3 text-sm outline-none focus:border-secondary focus:bg-white focus:ring-2 focus:ring-secondary/20"
                    placeholder="Best weekend drives around Islamabad"
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Short Excerpt</span>
                  <textarea
                    value={form.excerpt}
                    onChange={(e) => update("excerpt", e.target.value)}
                    rows={2}
                    className="w-full resize-y rounded-xl border border-primary/10 bg-[#f8f9fa] px-4 py-3 text-sm outline-none focus:border-secondary focus:bg-white focus:ring-2 focus:ring-secondary/20"
                    placeholder="One or two lines shown on the blog card"
                    required
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Category</span>
                    <select
                      value={form.category}
                      onChange={(e) => update("category", e.target.value)}
                      className="w-full rounded-xl border border-primary/10 bg-[#f8f9fa] px-4 py-3 text-sm outline-none focus:border-secondary focus:bg-white focus:ring-2 focus:ring-secondary/20"
                    >
                      {blogCategories.map((category) => (
                        <option key={category.slug} value={category.slug}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Author</span>
                    <input
                      value={form.author}
                      onChange={(e) => update("author", e.target.value)}
                      className="w-full rounded-xl border border-primary/10 bg-[#f8f9fa] px-4 py-3 text-sm outline-none focus:border-secondary focus:bg-white focus:ring-2 focus:ring-secondary/20"
                      placeholder="Best Carz Team"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Image Link (URL)</span>
                  <input
                    type="url"
                    value={form.image}
                    onChange={(e) => update("image", e.target.value)}
                    className="w-full rounded-xl border border-primary/10 bg-[#f8f9fa] px-4 py-3 text-sm outline-none focus:border-secondary focus:bg-white focus:ring-2 focus:ring-secondary/20"
                    placeholder="https://images.unsplash.com/photo-..."
                    required
                  />
                  {form.image ? (
                    <div className="relative mt-3 h-28 overflow-hidden rounded-xl border border-primary/8 bg-[#f3f4f5]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={form.image} alt="Preview" className="h-full w-full object-cover" />
                    </div>
                  ) : null}
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Read Time</span>
                  <input
                    value={form.readTime}
                    onChange={(e) => update("readTime", e.target.value)}
                    className="w-full rounded-xl border border-primary/10 bg-[#f8f9fa] px-4 py-3 text-sm outline-none focus:border-secondary focus:bg-white focus:ring-2 focus:ring-secondary/20"
                    placeholder="5 min read"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                    Content (one paragraph per line)
                  </span>
                  <textarea
                    value={form.content}
                    onChange={(e) => update("content", e.target.value)}
                    rows={6}
                    className="w-full resize-y rounded-xl border border-primary/10 bg-[#f8f9fa] px-4 py-3 text-sm outline-none focus:border-secondary focus:bg-white focus:ring-2 focus:ring-secondary/20"
                    placeholder={"First paragraph...\n\nSecond paragraph..."}
                    required
                  />
                </label>

                {formError ? <p className="text-sm font-medium text-red-600">{formError}</p> : null}

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold !text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="material-symbols-outlined text-[18px]">{editingSlug ? "save" : "add"}</span>
                  {saving ? "Saving..." : editingSlug ? "Update Blog" : "Publish Blog"}
                </button>
              </form>
            </div>

            <div className="flex min-h-0 flex-col overflow-hidden bg-[#f8f9fa]">
              <div className="border-b border-primary/8 bg-white px-5 py-4 sm:px-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-primary">All Added Blogs</h3>
                    <p className="mt-1 text-xs text-muted">
                      Saved in Firebase. Newest posts appear first. ({posts.length})
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSeedBlogs}
                    disabled={seeding || postsLoading}
                    className="rounded-xl border border-primary/15 px-3 py-2 text-[11px] font-semibold text-primary transition hover:bg-[#f8f9fa] disabled:opacity-60"
                  >
                    {seeding ? "Syncing..." : "Sync site blogs"}
                  </button>
                </div>
              </div>

              {viewPost ? (
                <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
                  <button
                    type="button"
                    onClick={() => setViewPost(null)}
                    className="mb-4 inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:underline"
                  >
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                    Back to list
                  </button>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={viewPost.image} alt={viewPost.title} className="mb-4 h-40 w-full rounded-xl object-cover" />
                  <h4 className="font-heading text-xl font-semibold text-primary">{viewPost.title}</h4>
                  <p className="mt-2 text-xs text-muted">
                    {viewPost.date} • {viewPost.readTime} • By {viewPost.author}
                  </p>
                  <p className="mt-3 text-sm text-primary/80">{viewPost.excerpt}</p>
                  <div className="mt-4 space-y-3 text-sm leading-relaxed text-primary/75">
                    {viewPost.content.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(viewPost)}
                      className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white"
                    >
                      Edit
                    </button>
                    <Link
                      href={`/blog/${viewPost.slug}`}
                      onClick={onClose}
                      className="rounded-xl border border-primary/15 px-4 py-2 text-xs font-semibold text-primary"
                    >
                      Open page
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 sm:px-6">
                  {formError ? <p className="mb-4 text-sm font-medium text-red-600">{formError}</p> : null}
                  {postsLoading ? (
                    <p className="py-10 text-center text-sm text-muted">Loading blogs from Firebase...</p>
                  ) : posts.length === 0 ? (
                    <p className="py-10 text-center text-sm text-muted">
                      No blogs in Firebase yet. Click &quot;Sync site blogs&quot; or add one from the left form.
                    </p>
                  ) : (
                    <ul className="space-y-3">
                      {posts.map((post) => {
                        const category = blogCategories.find((item) => item.slug === post.category);
                        return (
                          <li
                            key={post.slug}
                            className="overflow-hidden rounded-2xl border border-primary/8 bg-white shadow-sm"
                          >
                            <div className="flex gap-3 p-3 sm:p-4">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={post.image}
                                alt=""
                                className="h-20 w-20 shrink-0 rounded-xl object-cover sm:h-24 sm:w-24"
                              />
                              <div className="min-w-0 flex-1">
                                {category ? (
                                  <span className="text-[10px] font-semibold uppercase tracking-wide text-secondary">
                                    {category.name}
                                  </span>
                                ) : null}
                                <h4 className="mt-0.5 line-clamp-2 font-heading text-sm font-semibold text-primary sm:text-base">
                                  {post.title}
                                </h4>
                                <p className="mt-1 line-clamp-2 text-xs text-muted">{post.excerpt}</p>
                                <p className="mt-1 text-[11px] text-muted">
                                  {post.date} • {post.readTime}
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setViewPost(post)}
                                    className="rounded-lg border border-primary/10 px-2.5 py-1.5 text-[11px] font-semibold text-primary transition hover:bg-[#f8f9fa]"
                                  >
                                    View
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => startEdit(post)}
                                    className="rounded-lg bg-secondary/10 px-2.5 py-1.5 text-[11px] font-semibold text-secondary transition hover:bg-secondary/20"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDelete(post.slug)}
                                    className="rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-red-600 transition hover:bg-red-50"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
