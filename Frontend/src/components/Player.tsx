import { useEffect, useRef } from 'react';
// @ts-ignore
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import './Player.css';

export default function Player({ videoId }: { videoId: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<Plyr | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Initialize Plyr
        playerRef.current = new Plyr(containerRef.current, {
            iconUrl: 'https://cdn.plyr.io/1.8.2/plyr.svg',
            controls: [
                'play-large', 'restart', 'rewind', 'play', 'fast-forward',
                'progress', 'current-time', 'duration', 'mute', 'settings', 'pip', 'airplay', 'fullscreen'
            ],
            settings: ['captions', 'quality', 'speed', 'loop'],
            speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 4] },
            quality: { default: 1080, options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240] },
            youtube: {
                noCookie: false,
                rel: 0,
                showinfo: 0,
                iv_load_policy: 3,
                modestbranding: 1,
                controls: 0,
                fs: 0
            }
        });

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
            }
        };
    }, []);

    return (
        <div className="plyr__video-embed" ref={containerRef}>
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?origin=https://plyr.io&iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1`}
                allowFullScreen
                allowTransparency
                allow="autoplay"
            ></iframe>
        </div>
    );
}