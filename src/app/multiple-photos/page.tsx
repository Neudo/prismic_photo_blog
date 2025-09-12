"use client";

import { useState, useEffect } from "react";

interface Album {
  uid: string;
  title: string;
  id: string;
}

interface Category {
  uid: string;
  title: string;
  id: string;
}

interface ImagePreview {
  file: File;
  preview: string;
  modelName: string;
}

export default function MultiplePhotosPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedTarget, setSelectedTarget] = useState("");
  const [albums, setAlbums] = useState<Album[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  const [globalModelName, setGlobalModelName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Check localStorage for saved authentication
    const savedAuth = localStorage.getItem("multiple_image_password_set");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAlbums();
      fetchCategories();
    }
  }, [isAuthenticated]);

  const fetchAlbums = async () => {
    try {
      const response = await fetch("/api/get-albums");
      if (response.ok) {
        const data = await response.json();
        setAlbums(data);
      }
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/get-categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const response = await fetch("/api/verify-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
      setPassword("");
      // Save authentication status to localStorage
      localStorage.setItem("multiple_image_password_set", "true");
    } else {
      setError("Mot de passe incorrect");
    }
  };

  const compressImage = (file: File, maxWidth: number = 1920, quality: number = 0.8): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            resolve(file);
          }
        }, 'image/jpeg', quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const previews: ImagePreview[] = [];
      
      for (const file of files) {
        const compressedFile = await compressImage(file);
        previews.push({
          file: compressedFile,
          preview: URL.createObjectURL(file),
          modelName: "",
        });
      }
      
      setImagePreviews((prev) => [...prev, ...previews]);
    }
  };

  const handleModelNameChange = (index: number, modelName: string) => {
    setImagePreviews((prev) =>
      prev.map((img, i) => (i === index ? { ...img, modelName } : img)),
    );
  };

  const applyGlobalModelName = () => {
    if (globalModelName.trim()) {
      setImagePreviews((prev) =>
        prev.map((img) => ({ ...img, modelName: globalModelName.trim() })),
      );
    }
  };

  const removeImage = (index: number) => {
    setImagePreviews((prev) => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(newPreviews[index].preview);
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (imagePreviews.length === 0) {
      setError("Veuillez sélectionner au moins une image");
      return;
    }

    if (!selectedDestination) {
      setError("Veuillez sélectionner une destination");
      return;
    }

    if (!selectedTarget) {
      setError("Veuillez sélectionner un album ou une catégorie");
      return;
    }

    setUploading(true);
    setError("");
    setSuccess("");

    try {
      setSuccess(`Upload de ${imagePreviews.length} images en cours...`);

      const formData = new FormData();
      formData.append("destination", selectedDestination);
      formData.append("targetId", selectedTarget);

      imagePreviews.forEach((imagePreview, index) => {
        formData.append("images", imagePreview.file);
        formData.append(`modelName_${index}`, imagePreview.modelName || "");
      });

      const response = await fetch("/api/upload-images", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(`${data.count} images uploadées avec succès !`);
        imagePreviews.forEach((img) => URL.revokeObjectURL(img.preview));
        setImagePreviews([]);
        setSelectedDestination("");
        setSelectedTarget("");
        const fileInput = document.getElementById("file-input") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      } else {
        const errorData = await response.json();
        setError(`Erreur: ${errorData.error || "Erreur inconnue"}`);
      }
    } catch (err) {
      setError("Erreur lors de l'upload des images");
    } finally {
      setUploading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Accès protégé
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Entrez le mot de passe pour accéder à cette page
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handlePasswordSubmit}>
            <div>
              <label htmlFor="password" className="sr-only">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Valider
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-lg bg-white p-6 shadow">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">
            Upload multiple d&apos;images
          </h1>

          <form onSubmit={handleUploadSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="destination"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Où souhaitez-vous ajouter les images ?
              </label>
              <select
                id="destination"
                name="destination"
                value={selectedDestination}
                onChange={(e) => {
                  setSelectedDestination(e.target.value);
                  setSelectedTarget("");
                }}
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">-- Sélectionner une destination --</option>
                <option value="album">Album privé</option>
                <option value="categorie">Catégorie de photo</option>
              </select>
            </div>

            {selectedDestination === "album" && albums.length > 0 && (
              <div>
                <label
                  htmlFor="target"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Sélectionner l&apos;album
                </label>
                <select
                  id="target"
                  name="target"
                  value={selectedTarget}
                  onChange={(e) => setSelectedTarget(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">-- Sélectionner un album --</option>
                  {albums.map((album) => (
                    <option key={album.uid} value={album.uid}>
                      {album.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedDestination === "categorie" && categories.length > 0 && (
              <div>
                <label
                  htmlFor="target"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Sélectionner la catégorie
                </label>
                <select
                  id="target"
                  name="target"
                  value={selectedTarget}
                  onChange={(e) => setSelectedTarget(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">-- Sélectionner une catégorie --</option>
                  {categories.map((category) => (
                    <option key={category.uid} value={category.uid}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label
                htmlFor="file-input"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Sélectionner les images
              </label>
              <input
                id="file-input"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:rounded-full file:border-0
                  file:bg-indigo-50 file:px-4
                  file:py-2 file:text-sm
                  file:font-semibold file:text-indigo-700
                  hover:file:bg-indigo-100"
              />
            </div>

            {imagePreviews.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700">
                  Images sélectionnées ({imagePreviews.length})
                </h3>

                {/* Global model name section */}
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <h4 className="mb-2 text-sm font-medium text-blue-900">
                    Nom du modèle pour toutes les photos
                  </h4>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Nom du modèle (sera appliqué à toutes les photos)"
                      value={globalModelName}
                      onChange={(e) => setGlobalModelName(e.target.value)}
                      className="flex-1 rounded-md border border-blue-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={applyGlobalModelName}
                      disabled={!globalModelName.trim()}
                      className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                      Appliquer à tous
                    </button>
                  </div>
                </div>

                <div className="space-y-3 overflow-y-auto rounded-lg border p-4">
                  {imagePreviews.map((imagePreview, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 rounded-lg bg-gray-50 p-3"
                    >
                      <img
                        src={imagePreview.preview}
                        alt={`Preview ${index + 1}`}
                        className="h-16 w-16 rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="mb-1 text-sm text-gray-600">
                          {imagePreview.file.name}
                        </p>
                        <div className="w-full">
                          <input
                            type="text"
                            placeholder="Nom du modèle (optionnel)"
                            value={imagePreview.modelName}
                            onChange={(e) =>
                              handleModelNameChange(index, e.target.value)
                            }
                            className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {success && (
              <div className="rounded-md bg-green-50 p-4">
                <p className="text-sm text-green-800">{success}</p>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={uploading || imagePreviews.length === 0}
                className={`rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white ${
                  uploading || imagePreviews.length === 0
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                }`}
              >
                {uploading ? "Upload en cours..." : "Uploader les images"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
