"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowRightIcon,
  ArrowUpTrayIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "@/src/miscellaneous";
import { optimizeImage } from "@/src/Utils/cloudinaryOptimization";

interface ImageRecord {
  id: string;
  url: string;
  publicId: string;
  title: string;
  category: string;
  createdAt: string;
}

const CATEGORIES = ["Blackwork", "Fine Line", "Floral", "Outros"];

export default function AdminPanel() {
  const [images, setImages] = useState<ImageRecord[]>([]);
  const [loadingImages, setLoadingImages] = useState(true);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchImages = useCallback(async () => {
    setLoadingImages(true);
    const res = await fetch("/api/images");
    const data = await res.json();
    setImages(data);
    setLoadingImages(false);
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    if (selected) {
      setPreview(URL.createObjectURL(selected));
    } else {
      setPreview(null);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title.trim()) return;

    setUploading(true);
    setUploadError("");

    try {
      const signRes = await fetch("/api/cloudinary/sign");
      if (!signRes.ok) throw new Error("Falha ao obter assinatura.");
      const { signature, timestamp, apiKey, cloudName, folder } =
        await signRes.json();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", String(timestamp));
      formData.append("api_key", apiKey);
      formData.append("folder", folder);

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData },
      );
      if (!cloudRes.ok) throw new Error("Falha no upload para o Cloudinary.");
      const { secure_url, public_id } = await cloudRes.json();

      const saveRes = await fetch("/api/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: secure_url,
          publicId: public_id,
          title: title.trim(),
          category,
        }),
      });
      if (!saveRes.ok) throw new Error("Falha ao salvar imagem.");

      setTitle("");
      setCategory(CATEGORIES[0]);
      clearFile();
      await fetchImages();
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Erro desconhecido.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await fetch(`/api/images/${id}`, { method: "DELETE" });
    setImages((prev) => prev.filter((img) => img.id !== id));
    setDeletingId(null);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-black/10 sticky top-0 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <p className="text-black/30 text-xs uppercase tracking-[0.3em]">
              Julia Pedrozo
            </p>
            <h1
              className="text-black text-2xl leading-tight"
              style={{ fontFamily: "'Didot', serif" }}
            >
              Admin
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-black/40 hover:text-black text-xs uppercase tracking-widest transition-colors cursor-pointer"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[380px_1fr] gap-12 lg:gap-16">
          <section aria-label="Upload de imagem">
            <h2 className="text-xs uppercase tracking-widest text-black/40 mb-8 pb-4 border-b border-black/10">
              Nova Imagem
            </h2>

            <form onSubmit={handleUpload} noValidate className="space-y-6">
              <div>
                <label
                  htmlFor="file-upload"
                  className="block text-xs uppercase tracking-widest text-black/40 mb-3"
                >
                  Arquivo
                </label>
                {preview ? (
                  <div className="relative aspect-3/4 bg-black/5 overflow-hidden">
                    <Image
                      src={preview}
                      alt="Preview da imagem selecionada"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={clearFile}
                      aria-label="Remover imagem selecionada"
                      className="absolute top-2 right-2 flex items-center justify-center size-8 bg-black/60 text-white hover:bg-black transition-colors cursor-pointer"
                    >
                      <XMarkIcon className="size-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    aria-controls="file-upload"
                    className="w-full aspect-3/4 border border-dashed border-black/20 flex flex-col items-center justify-center gap-3 text-black/30 hover:text-black/60 hover:border-black/40 transition-colors cursor-pointer"
                  >
                    <ArrowUpTrayIcon className="size-8" />
                    <span className="text-xs uppercase tracking-widest">
                      Selecionar imagem
                    </span>
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </div>

              <div>
                <label
                  htmlFor="title"
                  className="block text-xs uppercase tracking-widest text-black/40 mb-3"
                >
                  Título
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Flor de Lotus"
                  required
                  className="w-full border border-black/20 text-black px-4 py-3 text-sm placeholder:text-black/20 focus:outline-none focus:border-black/60 transition-colors"
                />
              </div>

              <fieldset>
                <legend className="block text-xs uppercase tracking-widest text-black/40 mb-3">
                  Categoria
                </legend>
                <div className="flex flex-wrap gap-2" role="group">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      aria-pressed={category === cat}
                      className={classNames(
                        "px-4 py-2 text-xs uppercase tracking-wider transition-all cursor-pointer",
                        category === cat
                          ? "bg-black text-white"
                          : "border border-black/20 text-black/60 hover:border-black/60 hover:text-black",
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </fieldset>

              {uploadError && (
                <p
                  role="alert"
                  className="text-red-500 text-xs uppercase tracking-widest"
                >
                  {uploadError}
                </p>
              )}

              <button
                type="submit"
                disabled={uploading || !file || !title.trim()}
                className="w-full flex items-center justify-center gap-2 bg-black text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-black/80 transition-colors disabled:opacity-30 cursor-pointer"
              >
                {uploading ? "Enviando…" : "Publicar"}
                {!uploading && <ArrowRightIcon className="size-4" />}
              </button>
            </form>
          </section>

          <section aria-label="Imagens publicadas">
            <h2 className="text-xs uppercase tracking-widest text-black/40 mb-8 pb-4 border-b border-black/10">
              Publicadas{" "}
              <span className="text-black/20">({images.length})</span>
            </h2>

            {loadingImages ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-3/4 bg-black/5 animate-pulse"
                  />
                ))}
              </div>
            ) : images.length === 0 ? (
              <p className="text-black/30 text-sm text-center py-24">
                Nenhuma imagem publicada ainda.
              </p>
            ) : (
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {images.map((img) => (
                  <li key={img.id} className="group relative">
                    <div className="relative aspect-3/4 bg-black/5 overflow-hidden">
                      <Image
                        src={optimizeImage(img.url, 600)}
                        alt={`${img.title} — ${img.category}`}
                        fill
                        sizes="(max-width: 640px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    >
                      <button
                        onClick={() => handleDelete(img.id)}
                        disabled={deletingId === img.id}
                        aria-label={`Deletar ${img.title}`}
                        className="flex items-center gap-2 border border-white/40 text-white text-xs uppercase tracking-widest px-4 py-2 hover:bg-white hover:text-black transition-all disabled:opacity-40 cursor-pointer"
                      >
                        <TrashIcon className="size-4" />
                        {deletingId === img.id ? "Deletando…" : "Deletar"}
                      </button>
                    </div>
                  </div>
                  <dl className="pt-3 space-y-0.5">
                    <dt className="sr-only">Categoria</dt>
                    <dd className="text-black/30 text-xs uppercase tracking-wider">
                      {img.category}
                    </dd>
                    <dt className="sr-only">Título</dt>
                    <dd className="text-black text-sm truncate">{img.title}</dd>
                  </dl>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
