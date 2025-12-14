import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { songs } from "@/data/songs";
import { Music, PlayCircle } from "lucide-react";

const Songs = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Helmet>
                <title>Christian Devotional Songs | Bible Quiz Competition</title>
                <meta
                    name="description"
                    content="Listen to and read lyrics of popular Christian Malayalam devotional songs. Worship with our curated collection."
                />
                <link rel="canonical" href="https://biblequizcompetition.com/songs" />
            </Helmet>

            <Navigation />

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold font-urbanist text-gray-900 mb-4">
                        Devotional Songs
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Worship along with our collection of beautiful Christian devotional songs. Read lyrics, watch videos, and lift your spirit.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {songs.map((song) => (
                        <Card
                            key={song.id}
                            className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-none bg-white overflow-hidden"
                            onClick={() => navigate(`/songs/${song.slug}`)}
                        >
                            <div className="relative h-48 bg-gray-900 flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                <img
                                    src={`https://img.youtube.com/vi/${song.videoUrl.split('/').pop()}/maxresdefault.jpg`}
                                    alt={song.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80"
                                />
                                <PlayCircle className="w-12 h-12 text-white/90 absolute z-20 group-hover:scale-110 transition-transform" />
                            </div>

                            <CardContent className="p-6">
                                <div className="flex items-start gap-3 mb-3">
                                    <Music className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                    <h3 className="text-xl font-bold font-urbanist text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                                        {song.title}
                                    </h3>
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-2 pl-8">
                                    {song.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Songs;
