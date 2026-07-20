import { Plus, Trash2, X } from "lucide-react";
import { useState } from "react";

function NavbarEditCard({ navbar, onClose }) {
  const [headings, setHeadings] = useState(navbar?.headings ?? []);
  const [buttonText, setButtonText] = useState(navbar?.buttonText ?? "");

  const handleHeadingChange = (index, value) => {
    const updatedHeadings = [...headings];
    updatedHeadings[index] = value;

    setHeadings(updatedHeadings);
  };

  const addHeading = () => {
    setHeadings([...headings, ""]);
  };

  const removeHeading = (index) => {
    setHeadings(headings.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const data = {
      headings,
      buttonText,
    };

    console.log(data);
  };

  return (
    <div className="w-[380px] rounded-xl border border-gray-400 bg-gray-100 p-5 shadow-xl">
      
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Edit Navbar
          </h2>

          <p className="text-xs text-gray-500">
            Customize your website navbar
          </p>
        </div>

        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 transition hover:bg-gray-200"
        >
          <X size={17} />
        </button>
      </div>

      {/* Headings */}
      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Navbar Headings
          </label>

          <span className="text-xs text-gray-400">
            {headings.length} headings
          </span>
        </div>

        <div className="space-y-2">
          {headings.map((heading, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={heading}
                onChange={(e) =>
                  handleHeadingChange(index, e.target.value)
                }
                placeholder={`Heading ${index + 1}`}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-gray-500"
              />

              <button
                onClick={() => removeHeading(index)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 transition hover:bg-red-100 hover:text-red-500"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>

        {/* Add Heading */}
        <button
          onClick={addHeading}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-gray-400 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-200"
        >
          <Plus size={16} />
          Add New Heading
        </button>
      </div>

      {/* Button Text */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Navbar Button
        </label>

        <input
          type="text"
          value={buttonText}
          onChange={(e) => setButtonText(e.target.value)}
          placeholder="Login"
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-gray-500"
        />
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

export default NavbarEditCard;