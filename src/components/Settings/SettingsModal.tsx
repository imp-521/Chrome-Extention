
import React from "react";
import { IoMdClose } from "react-icons/io";

type SettingsModalProps = {
  onClose: () => void;
};

const SettingsModal = ({ onClose }: SettingsModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative h-[80vh] w-[85vw] max-w-5xl rounded-2xl bg-[#1e1e1e] p-6 text-white"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 cursor-pointer"
          aria-label="Close settings"
        >
          <IoMdClose size={24} />
        </button>

        <h2 id="settings-title" className="text-xl font-bold">
          Settings
        </h2>

        <div className="mt-6">
          {/* Settings content will be added here */}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
