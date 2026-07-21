"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowRightIcon,
  ArrowUpTrayIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import useSWR from "swr";
import api from "@/src/lib/api";
import { classNames } from "@/src/miscellaneous";
import { optimizeImage } from "@/src/Utils/cloudinaryOptimization";
import {
  WorkCategory,
  WorkImage,
  WorkType,
  WORK_CATEGORIES,
} from "@/src/types/work";

interface AdminWorkManagerProps {
  type: WorkType;
  label: string;
  uploadTitle: string;
  listTitle: string;
  emptyMessage: string;
}

interface SignResponse {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  folder: string;
  type: WorkType;
}

export default function AdminWorkManager({
  type,
  label,
  uploadTitle,
  listTitle,
  emptyMessage,
}: AdminWorkManagerProps) {
  const {
    data: images = [],
    error: imagesError,
    isLoading: loadingImages,
    mutate,
  } = useSWR<WorkImage[]>(`/images?type=${type}`);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<WorkCategory>(WORK_CATEGORIES[0]);
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview);
    },
    [preview],
  );

  const clearFile = () => {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFeedback("");
    const selected = event.target.files?.[0] ?? null;

    if (!selected) {
      clearFile();
      return;
    }

    if (selected.size > 10485760) {
      setFeedback("Arquivo muito grande. O tamanho máximo permitido é 10MB.");
      clearFile();
      return;
    }

    if (preview) URL.revokeObjectURL(preview);
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleUpload = async (event: FormEvent) => {
    event.preventDefault();
    if (!file || !title.trim()) return;

    setUploading(true);
    setFeedback("");

    try {
      const { data: signData } = await api.get<SignResponse>(
        "/cloudinary/sign",
        { params: { type } },
      );

      if (signData.type !== type) {
        throw new Error("O tipo retornado pela assinatura é inválido.");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signData.signature);
      formData.append("timestamp", String(signData.timestamp));
      formData.append("api_key", signData.apiKey);
      formData.append("folder", signData.folder);

      const cloudResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`,
        { method: "POST", body: formData },
      );

      if (!cloudResponse.ok) {
        throw new Error("Falha no upload para o Cloudinary.");
      }

      const { secure_url, public_id } = await cloudResponse.json();

      await api.post("/images", {
        url: secure_url,
        publicId: public_id,
        title: title.trim(),
        category,
        type,
      });

      setTitle("");
      setCategory(WORK_CATEGORIES[0]);
      clearFile();
      await mutate();
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Não foi possível publicar.",
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setFeedback("");

    try {
      await api.delete(`/images/${id}`);
      await mutate();
    } catch {
      setFeedback("Não foi possível excluir a imagem. Tente novamente.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section>
      <h2 className="sr-only">{label}</h2>

      <div className="grid lg:grid-cols-[380px_1fr] gap-12 lg:gap-16">
        <section aria-labelledby={`upload-title-${type}`}>
          <h3
            id={`upload-title-${type}`}
            className="text-xs uppercase tracking-widest text-black/40 mb-8 pb-4 border-b border-black/10"
          >
            {uploadTitle}
          </h3>

          <form onSubmit={handleUpload} noValidate className="space-y-6">
            {feedback && (
              <div
                role="alert"
                className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 text-xs uppercase tracking-widest"
              >
                {feedback}
              </div>
            )}

            <div>
              <label
                htmlFor={`file-upload-${type}`}
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
                  aria-controls={`file-upload-${type}`}
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
                id={`file-upload-${type}`}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="sr-only"
              />
            </div>

            <div>
              <label
                htmlFor={`title-${type}`}
                className="block text-xs uppercase tracking-widest text-black/40 mb-3"
              >
                Título
              </label>
              <input
                id={`title-${type}`}
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Ex: Flor de Lótus"
                required
                className="w-full border border-black/20 text-black px-4 py-3 text-sm placeholder:text-black/20 focus:outline-none focus:border-black/60 transition-colors"
              />
            </div>

            <fieldset>
              <legend className="block text-xs uppercase tracking-widest text-black/40 mb-3">
                Categoria
              </legend>
              <div className="flex flex-wrap gap-2">
                {WORK_CATEGORIES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    aria-pressed={category === item}
                    className={classNames(
                      "px-4 py-2 text-xs uppercase tracking-wider transition-all cursor-pointer",
                      category === item
                        ? "bg-black text-white"
                        : "border border-black/20 text-black/60 hover:border-black/60 hover:text-black",
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>

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

        <section aria-labelledby={`list-title-${type}`}>
          <h3
            id={`list-title-${type}`}
            className="text-xs uppercase tracking-widest text-black/40 mb-8 pb-4 border-b border-black/10"
          >
            {listTitle} <span className="text-black/20">({images.length})</span>
          </h3>

          {imagesError ? (
            <div
              role="alert"
              className="text-red-600 text-sm text-center py-24"
            >
              Não foi possível carregar as imagens. Tente novamente.
            </div>
          ) : loadingImages ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-3/4 bg-black/5 animate-pulse"
                />
              ))}
            </div>
          ) : images.length === 0 ? (
            <p className="text-black/30 text-sm text-center py-24">
              {emptyMessage}
            </p>
          ) : (
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {images.map((image) => (
                <li key={image.id} className="group relative">
                  <div className="relative aspect-3/4 bg-black/5 overflow-hidden">
                    <Image
                      src={optimizeImage(image.url, 600)}
                      alt={`${image.title} — ${image.category}`}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        onClick={() => handleDelete(image.id)}
                        disabled={deletingId === image.id}
                        aria-label={`Excluir ${image.title}`}
                        className="flex items-center gap-2 border border-white/40 text-white text-xs uppercase tracking-widest px-4 py-2 hover:bg-white hover:text-black transition-all disabled:opacity-40 cursor-pointer"
                      >
                        <TrashIcon className="size-4" />
                        {deletingId === image.id ? "Excluindo…" : "Excluir"}
                      </button>
                    </div>
                  </div>
                  <dl className="pt-3 space-y-0.5">
                    <dt className="sr-only">Categoria</dt>
                    <dd className="text-black/30 text-xs uppercase tracking-wider">
                      {image.category}
                    </dd>
                    <dt className="sr-only">Título</dt>
                    <dd className="text-black text-sm truncate">
                      {image.title}
                    </dd>
                  </dl>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </section>
  );
}
