import { ImagePlus, Trash2, X } from "lucide-react";
import { useState } from "react";

function HeroEditCard({ hero, onClose }) {
  const [images, setImages] = useState(hero?.eventImg ?? []);

  const handleAddImage = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    console.log(images);
  };

  return (
    <div className="w-[420px] rounded-xl border border-gray-400 bg-gray-100 p-5 shadow-xl">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Edit Hero
          </h2>

          <p className="text-xs text-gray-500">
            Manage your hero images
          </p>
        </div>

        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 transition hover:bg-gray-200"
        >
          <X size={17} />
        </button>
      </div>

      {/* Images */}
      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Hero Images
          </label>

          <span className="text-xs text-gray-400">
            {images.length} images
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {images.map((image, index) => {
            const imageSrc =
              typeof image === "string" ? image : image.preview;

            return (
              <div
                key={index}
                className="group relative h-28 overflow-hidden rounded-md border border-gray-300 bg-white"
              >
                <img
                  src={imageSrc}
                  alt={`Hero ${index + 1}`}
                  className="h-full w-full object-cover"
                />

                <button
                  onClick={() => removeImage(index)}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md bg-white/90 text-gray-600 opacity-0 shadow transition group-hover:opacity-100 hover:bg-red-100 hover:text-red-500"
                >
                  <Trash2 size={14} />
                </button>

                <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1 text-xs text-white">
                  Image {index + 1}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Image */}
        <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-gray-400 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-200">
          <ImagePlus size={17} />
          Add New Image

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleAddImage}
            className="hidden"
          />
        </label>
      </div>

      {/* Footer */}
      <div className="flex gap-2">
        <button
          onClick={onClose}
          className="w-full rounded-md border border-gray-300 bg-white py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          className="w-full rounded-md bg-sky-600 py-2 text-sm font-medium text-white transition hover:bg-sky-500"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default HeroEditCard;