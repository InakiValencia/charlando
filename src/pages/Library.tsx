import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type LibraryVideo = {
  id: string;
  title: string;
  videoUrl: string;
  poster: string;
};

const LIBRARY_VIDEOS: LibraryVideo[] = Array.from({ length: 10 }, (_, index) => ({
  id: `charlando-video-${String(index + 1).padStart(2, "0")}`,
  title: `Video ${String(index + 1).padStart(2, "0")}`,
  videoUrl: `/videos/charlando-video-${String(index + 1).padStart(2, "0")}.mp4`,
  poster: `/videos/posters/charlando-video-${String(index + 1).padStart(2, "0")}.png`,
}));

const Library = () => {
  const [selectedVideo, setSelectedVideo] = useState<LibraryVideo | null>(null);

  const playPreview = (card: HTMLButtonElement) => {
    const preview = card.querySelector("video");
    if (!preview) return;
    preview.currentTime = preview.currentTime || 0;
    preview.play().catch(() => undefined);
  };

  const resetPreview = (card: HTMLButtonElement) => {
    const preview = card.querySelector("video");
    if (!preview) return;
    preview.pause();
    preview.currentTime = 0;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-6 lg:px-8">
          <Link to="/" className="shrink-0">
            <Logo size="md" />
          </Link>
          <Button variant="outline" className="h-11 px-4 font-semibold active:scale-[0.96]" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1600px] px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
        <motion.div
          className="mb-8 text-center lg:mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-4 font-display text-4xl font-bold text-foreground text-balance sm:text-5xl lg:text-6xl">
            Biblioteca
          </h1>
          <p className="mx-auto max-w-3xl text-balance text-xl leading-relaxed text-muted-foreground sm:text-2xl">
            Videos reales de Charlando para ver el formato, el ritmo y las reacciones.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 lg:grid-cols-5 xl:gap-5">
          {LIBRARY_VIDEOS.map((video, index) => (
            <motion.button
              key={video.id}
              type="button"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              onClick={() => setSelectedVideo(video)}
              onMouseEnter={(event) => {
                playPreview(event.currentTarget);
              }}
              onMouseLeave={(event) => {
                resetPreview(event.currentTarget);
              }}
              onFocus={(event) => {
                playPreview(event.currentTarget);
              }}
              onBlur={(event) => {
                resetPreview(event.currentTarget);
              }}
              className="group relative overflow-hidden rounded-3xl bg-card text-left shadow-sm outline-none transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 active:scale-[0.96]"
            >
              <div className="relative aspect-[9/16] overflow-hidden bg-muted">
                <video
                  src={video.videoUrl}
                  poster={video.poster}
                  aria-label={`Preview de ${video.title}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-sm font-medium text-white/75">Click para abrir con audio</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </main>

      <Dialog open={Boolean(selectedVideo)} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border-0 bg-foreground p-0 shadow-2xl sm:max-w-[430px]">
          <DialogHeader className="sr-only">
            <DialogTitle>{selectedVideo?.title ?? "Video de Charlando"}</DialogTitle>
          </DialogHeader>
          <div className="aspect-[9/16] w-full bg-black">
            {selectedVideo && (
              <video
                key={selectedVideo.id}
                src={selectedVideo.videoUrl}
                poster={selectedVideo.poster}
                aria-label={selectedVideo.title}
                className="h-full w-full border-0"
                autoPlay
                controls
                playsInline
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Library;
