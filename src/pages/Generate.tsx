import { useState } from "react";
import { useGenerate } from "../context/GenerateContext"; // path adjust kar lena agar zarurat pade (jaise @/context/GenerateContext)

const ratios: string[] = ["16:9", "1:1", "9:16"];

const colors: string[] = [
  "from-pink-500 to-orange-400",
  "from-cyan-500 to-blue-500",
  "from-emerald-500 to-green-400",
  "from-purple-500 to-fuchsia-500",
  "from-gray-400 to-gray-600",
  "from-yellow-400 to-pink-500",
];

interface ThumbnailStyle {
  label: string;
  desc: string;
}

const thumbnailStyles: ThumbnailStyle[] = [
  { label: "✨ Bold & Graphic", desc: "High contrast, bold typography" },
  { label: "🎨 Minimal Clean", desc: "Simple layout with soft colors" },
  { label: "🔥 Cinematic", desc: "Dark tones with dramatic lighting" },
  { label: "📸 Photo Focused", desc: "Large image, minimal text" },
  { label: "🤖 AI Futuristic", desc: "Neon colors, tech-inspired visuals" },
];

const fakeImages: string[] = [
  "https://miro.medium.com/v2/resize:fit:1400/1*3_z6FVaByH475JG24vnmEQ.png",
  "https://i.ytimg.com/vi/aEPzcCpDRHU/maxresdefault.jpg",
  "https://plusai.com/622ffb3448f15ce7a33c6a2b/64768130aa2921923a8643d2_japancold.png",
  "https://tmt-assets-ui.s3.eu-north-1.amazonaws.com/assets/ai/landingpage/showcase/showcase1.png",
  "https://miro.medium.com/v2/resize:fit:1400/1*wiaqqfRdJFKUOzHxg0NJMA.png",
  "https://plusai.com/622ffb3448f15ce7a33c6a2b/64768130e9439559ed3e26d0_laugh1.png",
  "https://plusai.com/622ffb3448f15ce7a33c6a2b/64768130244a6a1672e808c3_image%20(13).png",
  "https://i.ytimg.com/vi/5MjQiVcFb8c/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC-tf9GzPsO7PhrqP4lrA8ip5dKXg",
  "https://i.ytimg.com/vi/SaNwULsL4h4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDOCLhYJsh-gUS0p2OVcwGxXAcV7Q",
  "https://www.heygen.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fpdhqcmb1%2Fproduction%2F48974e1c1db79495993e80314e6223af5f6415bc-1600x900.jpg%3Ffit%3Dmax%26auto%3Dformat&w=3840&q=75",
  "https://www.socialmediaexaminer.com/wp-content/uploads/2024/07/how-to-create-stunning-ai-thumbnails-for-youtube-use-ai-to-create-podcast-and-video-thumbnail-image-drafts-example-2.png",
  "https://resource.flexclip.com/pages/learn-center/ai-youtube-thumbnail-generator/generate-youtube-thumbnail-with-ai-manual-edits.webp",
  "https://pic.chinaz.com/ai/2023/11/21/202311211511512632.jpg",
  "https://cdn.prod.website-files.com/6544bdfdf184393c08205ae6/670a63d9a4eb5b2aede4dee4_66d94d1f20833b43c91f4be1_66c89bd8b4b5a421fc41cae1_66c894656afc89ebe02b0055_Thumbnail.png",
  "https://imgv3.fotor.com/images/videoImage/Fotor-AI-thumbnail-maker-example-for-a-tutorial-video.jpg",
  "https://i.ytimg.com/vi/9Xifo4iMb6A/hq720.jpg",
  "https://i.ytimg.com/vi/hDYO_mjxCc8/maxresdefault.jpg",
  "https://vidpros.com/wp-content/uploads/2025/10/AI-YouTube-Thumbnail-Prompts_-ChatGPT-Nano-Banana-SeeDream-Guide.webp",
  "https://www.ambienceai.com/_next/image?url=%2Ftools%2Fai-thumbnail-generator%2Fyoutube%2Fhero-youtube-thumbnail.png&w=1920&q=75",
  "https://cdn3.pixelcut.app/pixa_cms/media/4f8f4f47-f6d1-4281-a847-dcc9d267f48a_hero_image_1332ec55.webp",
  "https://starryai.com/cdn-cgi/image/format=auto,quality=90/https%3A%2F%2Fcdn.prod.website-files.com%2F61554cf1696635e97e823d26%2F687d1c05ffa302046dacf881_f188799d-bbb7-40d1-9ed4-cb6b1bb1fde3.png",
  "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=2202115030246246",
  "https://cdn.fliki.ai/image/page/660ba680adaa44a37532fd97/666310fc647d79dc96fd21a3.jpg",
  "https://img.freepik.com/free-photo/supersport-car-cyberpunk-city-with-neon-lights-generative-ai_191095-1234.jpg",
  "https://img.freepik.com/premium-photo/futuristic-sports-car-with-glowing-neon-lights-driving-fast-wet-city-street-night-illuminated-by-vibrant-neon-signs-skyscrapers-creating-cyberpunk-atmosphere_250994-9348.jpg",
  "https://img.freepik.com/free-photo/supersport-car-cyberpunk-city-with-neon-lights-generative-ai_191095-1249.jpg",
  "https://thumbs.dreamstime.com/b/futuristic-sports-car-drifting-rain-slicked-neon-street-wet-surfaces-reflective-highlights-dynamic-motion-blur-futuristic-365472370.jpg",
  "https://thumbs.dreamstime.com/b/futuristic-motorcycles-racing-neon-lit-cyberpunk-city-high-tech-motorcycles-sleek-aerodynamic-designs-glowing-357655079.jpg",
  "https://thumbs.dreamstime.com/b/futuristic-motorcycle-design-glowing-neon-lines-digital-art-high-tech-aesthetics-vibrant-colors-abstract-representation-ai-356587769.jpg",
  "https://thumbs.dreamstime.com/b/cyberpunk-biker-rides-futuristic-motorcycle-city-night-scene-wet-street-reflects-neon-lights-glowing-red-blue-rider-wears-black-348000488.jpg",
  "https://thumbs.dreamstime.com/b/futuristic-motorcycle-glowing-neon-wheels-stands-middle-rainy-cyberpunk-city-street-vivid-lights-wet-pavement-341060719.jpg",
  "https://thumbs.dreamstime.com/b/futuristic-motorcycle-speeds-glowing-neon-lights-high-tech-cityscape-showcasing-dynamic-fast-paced-intense-sense-373306944.jpg",
  "https://thumbs.dreamstime.com/b/futuristic-motorbike-motorcycle-riding-speed-adrenaline-city-lights-night-neon-cyberpunk-futuristic-motorbike-motorcycle-riding-359191174.jpg",
  "https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0",  // sports boy/car
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",  
  "https://images.unsplash.com/photo-1557683316-973673baf926",
  "https://images.unsplash.com/photo-1553356084-58ef4a67b2a7",        
  "https://images.unsplash.com/photo-1557682250-33bd709cbe08",        // neon red blue glowing car interior
  "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5",        // futuristic sports car rain reflection
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70",     // cyberpunk driver black jacket vibe
  "https://images.unsplash.com/photo-1557683311-973673baf926",
  "https://thumbs.dreamstime.com/z/cyberpunk-cityscape-rainy-night-neon-lights-retro-car-401198129.jpg?ct=jpeg",
  "https://thumbs.dreamstime.com/b/cyberpunk-city-street-view-car-driving-neon-light-illumination-evening-scene-futuristic-cityscape-blade-runner-274520698.jpg",     // blade runner car neon drive
  "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=2056278994563784",     // blade runner inspired cyberpunk patrol
  "https://thumbs.dreamstime.com/b/haunting-world-blade-runner-neon-city-retro-modern-virtual-reality-sci-fi-futuristic-generative-ai-277916179.jpg",     // haunting blade runner neon dystopia
  "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=122161419482101780",     // neon city patrol blade runner vibe
  "https://thumbs.dreamstime.com/b/futuristic-city-street-night-rain-cyberpunk-futuristic-city-street-night-rain-cyberpunk-348869658.jpg",     // rainy cyberpunk street night
  "https://image.lexica.art/md2_webp/ee91b986-81b6-4c87-b099-f74808012f09",     // cyberpunk 2077 police chase movie style
  "https://thumbs.dreamstime.com/b/futuristic-car-driving-neon-lit-city-rain-digital-cyberpunk-vibes-illuminated-vibrant-lights-344135119.jpg",     // futuristic car rain neon cyberpunk
  "https://thumbs.dreamstime.com/b/low-angle-dynamic-shot-futuristic-sports-car-driving-down-wet-neon-lit-cyberpunk-city-street-night-ideal-themes-422153045.jpg",     // low angle cyberpunk car night rain
  "https://thumbs.dreamstime.com/b/cyberpunk-city-street-night-rain-neon-lights-futuristic-vehicles-rainy-night-futuristic-cyberpunk-city-street-neon-380413667.jpg",     // neon vehicles rainy cyberpunk street
  "https://thumbs.dreamstime.com/b/flying-cars-weave-neon-drenched-rain-slicked-cyberpunk-cityscape-red-light-trails-speed-along-multi-level-highways-396386575.jpg",     // flying cars neon rain cyberpunk highway
  "https://thumbs.dreamstime.com/b/futuristic-cyberpunk-city-night-neon-lights-flying-cars-cityscape-depicting-bustling-urban-environment-filled-384437238.jpg",
  "https://thumbs.dreamstime.com/b/neon-cyberpunk-cityscape-futuristic-flying-vehicles-above-elevated-highway-night-nighttime-view-futuristic-city-neon-377546552.jpg",
  "https://thumbs.dreamstime.com/b/futuristic-city-street-neon-lights-flying-cars-rain-night-futuristic-city-street-neon-lights-flying-334585158.jpg",
  "https://thumbs.dreamstime.com/b/flying-cars-soaring-above-futuristic-neon-lit-city-highway-night-future-town-filled-towering-skyscrapers-illuminated-354815168.jpg",
  "https://thumbs.dreamstime.com/b/futuristic-city-night-flying-cars-holographic-displays-vibrant-futuristic-city-night-featuring-flying-cars-408489751.jpg",
  "https://thumbs.dreamstime.com/b/neon-lit-futuristic-city-flying-vehicles-night-cityscape-featuring-cars-hovering-skyscrapers-under-glowing-cloud-350682223.jpg",
  "https://thumbs.dreamstime.com/b/futuristic-cyberpunk-city-night-neon-lights-flying-cars-cityscape-depicting-bustling-urban-environment-filled-384437238.jpg",
  "https://thumbs.dreamstime.com/b/neon-cyberpunk-cityscape-futuristic-flying-car-elevated-highway-night-city-showcasing-gliding-over-scene-bathed-376748148.jpg",
  "https://thumbs.dreamstime.com/b/futuristic-highway-neon-lit-city-sunset-dynamic-cutting-showcasing-advanced-flying-vehicles-vibrant-skyscrapers-357448841.jpg",
  "https://thumbs.dreamstime.com/b/futuristic-city-drive-neon-lights-flying-cars-sleek-red-car-drives-wet-highway-night-illuminated-vibrant-425353154.jpg",
  "https://thumbs.dreamstime.com/b/futuristic-neon-motorcycle-cyberpunk-city-rain-generative-ai-sleek-powerful-illuminated-vibrant-lights-rainy-cityscape-371160556.jpg",
  "https://thumbs.dreamstime.com/b/cyberpunk-motorcycle-rain-futuristic-motorcycle-parked-rainy-city-street-night-illuminated-vibrant-neon-lights-355575429.jpg",
  "https://thumbs.dreamstime.com/b/biker-futuristic-bike-rainy-night-neon-city-cyberpunk-style-generative-ai-268932873.jpg",
  "https://thumbs.dreamstime.com/b/biker-futuristic-bike-rainy-night-neon-city-cyberpunk-style-generative-ai-268019094.jpg",
  "https://thumbs.dreamstime.com/b/biker-futuristic-bike-neon-city-cyberpunk-style-generative-ai-biker-futuristic-bike-rainy-night-neon-city-268082661.jpg",
  "https://thumbs.dreamstime.com/b/cyberpunk-city-night-rain-slicked-streets-neon-lights-cyberpunk-style-motorcyclist-rides-rain-slicked-city-night-372861138.jpg",
  "https://thumbs.dreamstime.com/b/cyberpunk-biker-rides-futuristic-motorcycle-city-night-scene-wet-street-reflects-neon-lights-glowing-red-blue-rider-wears-black-348000488.jpg",
  "https://thumbs.dreamstime.com/b/futuristic-motorcycle-design-glowing-neon-lines-digital-art-high-tech-aesthetics-vibrant-colors-abstract-representation-ai-356587769.jpg",
  "https://thumbs.dreamstime.com/b/futuristic-neon-motorcycle-cyberpunk-style-vibrant-lighting-ai-generated-image-stunning-d-render-custom-motorcycle-398962359.jpg",
  "https://thumbs.dreamstime.com/b/futuristic-motorcycle-rain-neon-city-night-cyberpunk-style-video-game-357729466.jpg",

  

];

const Generate = () => {
  const { addGenerated } = useGenerate();

  const [ratio, setRatio] = useState<string>("16:9");
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [styleOpen, setStyleOpen] = useState<boolean>(false);
  const [selectedStyle, setSelectedStyle] = useState<ThumbnailStyle>(thumbnailStyles[0]);
  const [title, setTitle] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerate = () => {
    if (!title.trim() && !prompt.trim()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const inputText = `${title} ${prompt} ${selectedStyle.label} ${colors[selectedColor]} ${ratio}`;
      let hash = 0;
      for (let i = 0; i < inputText.length; i++) {
        const char = inputText.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
      }

      const index = Math.abs(hash) % fakeImages.length;
      const generatedUrl = fakeImages[index];

      setPreviewImage(generatedUrl);
      setIsLoading(false);

      // Save to My Generations
      addGenerated({
        title: title.trim() || prompt.trim().slice(0, 70) + (prompt.trim().length > 70 ? "..." : ""),
        image: generatedUrl,
        style: selectedStyle.label,
        ratio,
        color: colors[selectedColor],
      });
    }, 800);
  };

  return (
    <>
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-24 -translate-x-1/2 w-[320px] h-[160px] bg-gradient-to-tr from-pink-600/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute right-16 bottom-16 w-[200px] h-[120px] bg-gradient-to-bl from-fuchsia-600/40 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="min-h-screen bg-black text-white px-6 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT PANEL */}
          <div className="rounded-2xl bg-white/5 border border-pink-500/30 backdrop-blur p-6">
            <h2 className="text-2xl font-semibold">Create Your Thumbnail</h2>
            <p className="text-gray-400 text-sm mt-1">
              Describe your vision and let AI bring it to life
            </p>

            <div className="mt-6">
              <label className="text-sm text-gray-300">Title or Topic</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., 10 Tips for Better Sleep"
                className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div className="mt-6">
              <label className="text-sm text-gray-300">Additional Details / Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                placeholder="e.g. Shocked face, bold yellow text, dark cinematic background"
                className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm outline-none resize-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-300 mb-2">Aspect Ratio</p>
              <div className="flex gap-3 flex-wrap">
                {ratios.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRatio(r)}
                    className={`px-4 py-2 rounded-xl border text-sm transition ${
                      ratio === r
                        ? "border-pink-500 bg-pink-500/20 text-white"
                        : "border-white/10 hover:bg-white/5"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 relative">
              <p className="text-sm text-gray-300 mb-2">Thumbnail Style</p>
              <div
                onClick={() => setStyleOpen(!styleOpen)}
                className="cursor-pointer rounded-xl bg-black/40 border border-white/10 px-4 py-3 flex justify-between items-center hover:bg-white/5"
              >
                <span>{selectedStyle.label}</span>
                <span className="text-gray-400">▼</span>
              </div>

              {styleOpen && (
                <div className="absolute z-20 mt-2 w-full rounded-xl bg-black/90 border border-white/10 overflow-hidden shadow-xl">
                  {thumbnailStyles.map((style, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setSelectedStyle(style);
                        setStyleOpen(false);
                      }}
                      className="px-4 py-3 hover:bg-white/10 cursor-pointer transition"
                    >
                      <p className="text-sm">{style.label}</p>
                      <p className="text-xs text-gray-400">{style.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-xs text-gray-500 mt-1">{selectedStyle.desc}</p>
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-300 mb-2">Color Scheme</p>
              <div className="flex gap-3 flex-wrap">
                {colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${c} transition-transform ${
                      selectedColor === i
                        ? "ring-2 ring-pink-500 ring-offset-2 ring-offset-black scale-110"
                        : "hover:scale-110"
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={(!title.trim() && !prompt.trim()) || isLoading}
              className={`mt-8 w-full h-12 rounded-xl font-medium transition-all flex items-center justify-center gap-3 ${
                title.trim() || prompt.trim()
                  ? "bg-pink-500 hover:bg-pink-400 shadow-lg shadow-pink-500/20"
                  : "bg-gray-700 cursor-not-allowed"
              } ${isLoading ? "opacity-80 cursor-wait" : ""}`}
            >
              {isLoading ? (
                <>
                  <div className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
                  Generating...
                </>
              ) : (
                "Generate Thumbnail"
              )}
            </button>
          </div>

          {/* RIGHT PANEL - PREVIEW */}
          <div className="relative rounded-2xl bg-white/5 border border-pink-500/40 backdrop-blur p-6 flex flex-col overflow-hidden shadow-[0_0_40px_rgba(236,72,153,0.15)]">
            <div className="absolute inset-0 -z-10 pointer-events-none">
              <div className="absolute left-[-60px] top-1/2 -translate-y-1/2 w-[220px] h-[140px] bg-gradient-to-tr from-pink-600/40 to-transparent rounded-full blur-3xl" />
              <div className="absolute left-1/2 top-24 -translate-x-1/2 w-[260px] h-[140px] bg-gradient-to-tr from-purple-600/30 to-transparent rounded-full blur-3xl" />
              <div className="absolute right-[-40px] bottom-10 w-[200px] h-[120px] bg-gradient-to-bl from-fuchsia-600/40 to-transparent rounded-full blur-3xl" />
            </div>

            <h2 className="text-xl font-semibold mb-4">Preview</h2>

            <div className="flex-1 flex items-center justify-center p-4 relative">
              <div
                className={`w-full max-w-md rounded-xl overflow-hidden border-2 border-dashed border-white/20 bg-black/30 shadow-inner relative ${ratio === "16:9" ? "aspect-video" : ratio === "1:1" ? "aspect-square" : "aspect-[9/16]"}`}
              >
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10">
                    <div className="text-center">
                      <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-pink-500 border-r-transparent mb-4" />
                      <p className="text-lg font-medium text-white">Creating your thumbnail...</p>
                      <p className="text-sm text-gray-300 mt-2">This may take a moment</p>
                    </div>
                  </div>
                ) : previewImage ? (
                  <img
                    src={previewImage}
                    alt="Generated Thumbnail Preview"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="high"
                    width={800}
                    height={450}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center px-6">
                      <div className="text-5xl mb-4">🖼️</div>
                      <p className="font-medium text-lg">Your Thumbnail Will Appear Here</p>
                      <p className="text-sm mt-2 opacity-70">
                        Enter title/prompt and click Generate
                      </p>
                      <p className="text-xs mt-4 text-gray-500">
                        Current: {ratio} • {selectedStyle.label}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Generate;