const PopUp = ({
  isOpen,
  onClose,
  password,
  onPasswordChange,
  deleteBook,
  deleteGenre,
  itemToDelete,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-[1000]"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg relative max-w-sm w-[90%]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Confirm Password
        </h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={onPasswordChange}
          autoFocus
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => {
              if (itemToDelete.type === "genre") {
                deleteGenre();
              }
              if (itemToDelete.type === "book") {
                deleteBook();
              }
              onClose();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
