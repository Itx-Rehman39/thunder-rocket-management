'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, Link as LinkIcon, Image as ImageIcon, X, CheckCircle2 } from 'lucide-react';

interface ImageUploadInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: string;
}

export const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  label = 'Image / Photo',
  value,
  onChange,
  placeholder = 'https://... or choose local file',
  helperText = 'Supports JPG, PNG, WebP files or remote web links',
}) => {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 5MB for clean local storage
    if (file.size > 5 * 1024 * 1024) {
      alert('Selected image exceeds 5MB limit. Please choose a smaller file.');
      return;
    }

    setFileName(file.name);
    setFileSize((file.size / 1024).toFixed(1) + ' KB');

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        onChange(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    onChange('');
    setFileName('');
    setFileSize('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="font-bold text-slate-700 text-xs block">{label}</label>
        
        {/* Toggle Mode Buttons */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 ${
              mode === 'upload'
                ? 'bg-white text-[#0B222E] shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <UploadCloud className="w-3 h-3 text-[#00B4D8]" />
            <span>Upload JPG / File</span>
          </button>
          
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 ${
              mode === 'url'
                ? 'bg-white text-[#0B222E] shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <LinkIcon className="w-3 h-3 text-[#0A9396]" />
            <span>Image URL Link</span>
          </button>
        </div>
      </div>

      {mode === 'upload' ? (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/jpg,.jpg,.jpeg,.png,.webp"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload-input"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-[#00B4D8]/40 hover:border-[#00B4D8] bg-[#F8FCFD] hover:bg-[#E0F7FA]/30 rounded-2xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5 group"
          >
            <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-[#00B4D8] group-hover:scale-110 transition-transform">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-slate-800">
              Click to browse JPG / PNG photo
            </div>
            <p className="text-[10px] text-slate-400">
              Supports .jpg, .jpeg, .png, .webp (up to 5MB)
            </p>
          </div>
        </div>
      ) : (
        <div>
          <input
            type="url"
            value={value.startsWith('data:') ? '' : value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-[#F8FCFD] border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 outline-none focus:border-[#00B4D8]"
          />
        </div>
      )}

      {/* Preview Section if Image Exists */}
      {value && (
        <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
              <img
                src={value}
                alt="Uploaded preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Image Attached</span>
              </div>
              <p className="text-[10px] text-slate-400 truncate max-w-[200px] sm:max-w-xs font-mono">
                {fileName || (value.startsWith('data:') ? 'Local file selected' : value)}
              </p>
              {fileSize && (
                <span className="text-[9px] text-slate-400 font-mono">{fileSize}</span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
            title="Remove Photo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {helperText && !value && (
        <p className="text-[10px] text-slate-400">{helperText}</p>
      )}
    </div>
  );
};
