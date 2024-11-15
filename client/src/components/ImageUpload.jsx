function ImageUpload({ title, onUpload }) {
    const handleFileChange = (event) => {
        onUpload(event.target.files); // Pass the files back to parent
    };

    return (
        <div>
            <label htmlFor="file_upload" className="block mb-2 text-sm text-left font-semibold mt-3 pb-1 dark:text-white">
                {title}
            </label>
            <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_upload"
                type="file"
                multiple // Allow multiple file selection
                onChange={handleFileChange}
            />
        </div>
    );
}

export default ImageUpload;