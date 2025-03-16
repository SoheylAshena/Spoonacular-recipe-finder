export default function FavoritesLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10 animate-pulse">
        <div className="h-10 bg-gray-200 w-64 mx-auto mb-3 rounded-md"></div>
        <div className="h-4 bg-gray-200 w-96 mx-auto rounded-md"></div>
      </div>
      <div className="max-w-md mx-auto mb-10">
        <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse"
          >
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4">
              <div className="h-5 bg-gray-200 rounded mb-3 w-3/4"></div>
              <div className="flex justify-between mb-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
