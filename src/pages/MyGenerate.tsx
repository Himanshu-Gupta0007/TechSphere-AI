
import { Trash2, Download, ArrowUpRight } from "lucide-react";
import { useGenerate } from "../context/GenerateContext"; // ← yeh line add kar (path sahi kar lena)

const MyGenerate = () => {
  // ← yeh line add kar (context se live data le rahe hain)
  const { generated, deleteById } = useGenerate();

  // ← ab static data ki zarurat nahi, context se aa raha hai
  // const [communityData, setCommunityData] = useState(...); ← comment out ya hata de

  const handleView = (image: string): void => {
    window.open(image, "_blank");
  };

  const handleDownload = async (image: string, title: string): Promise<void> => {
    try {
      const res = await fetch(image);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${title.replace(/[^a-z0-9]/gi, "_")}.jpg`; // safe filename
      a.click();

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
      alert("Image download nahi ho paaya, right click karke save kar le");
    }
  };

  const handleDelete = (id: number): void => {
    const ok = window.confirm("Are you sure you want to delete?");
    if (!ok) return;

    deleteById(id); // ← context se delete kar rahe hain
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-6 md:px-16 lg:px-24 pt-24 text-white">
      {/* Soft Backdrop – bilkul same rakh raha hoon, nahi hata raha */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-20 -translate-x-1/2 w-245 h-115 bg-gradient-to-tr from-pink-600/35 to-transparent rounded-full blur-3xl" />
        <div className="absolute right-12 bottom-10 w-105 h-55 bg-gradient-to-bl from-fuchsia-600/35 to-transparent rounded-full blur-2xl" />
      </div>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">My Generations</h1>
        <p className="text-gray-400 mt-2 max-w-xl">
          Your AI generated thumbnails
        </p>
      </div>

      {/* Cards – ab context se generated data use kar rahe */}
      {generated.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl">Abhi koi thumbnail generate nahi hua</p>
          <p>Generate page pe jaake kuch bana ke dekh!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {generated.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl hover:scale-[1.02] transition"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover group-hover:scale-110 transition"
                />
                <div className="absolute inset-0 bg-black/20" />

                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => handleView(item.image)}
                    className="p-2 rounded-full bg-black/50 hover:bg-pink-600"
                  >
                    <ArrowUpRight size={16} />
                  </button>

                  <button
                    onClick={() => handleDownload(item.image, item.title)}
                    className="p-2 rounded-full bg-black/50 hover:bg-emerald-600"
                  >
                    <Download size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-full bg-black/50 hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg line-clamp-2">
                  {item.title}
                </h3>

                <div className="flex flex-wrap gap-2 mt-3">
                  {/* context ke tags ki jagah actual fields use kar rahe */}
                  <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-gray-300">
                    {item.style || "Style"}
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-gray-300">
                    {item.ratio || "Ratio"}
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-gray-300">
                    {item.color ? item.color.split(" ")[1] : "Color"}
                  </span>
                </div>

                <p className="text-xs text-gray-500 mt-4">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyGenerate;