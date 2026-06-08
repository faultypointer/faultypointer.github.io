import { Code, Link, Mail, MapPin } from "lucide-react";
import { aboutMe } from "../../data/aboutMe";
import profileImage  from "../../assets/profile/profile.jpg";

export default function AboutMeApp() {
    return (
        <div className="h-full overflow-y-auto bg-gray-900 text-white">
            <div className="p-8 max-w-lg mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-3xl font-bold">
                        <img
                            src={profileImage}
                            alt={aboutMe.name[0]}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{aboutMe.name}</h1>
                        <p className="text-blue-400">{aboutMe.role}</p>
                        <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
                            <MapPin size={12} />
                            <span>{aboutMe.location}</span>
                        </div>
                    </div>
                </div>

                <p className="text-gray-300 leading-relaxed mb-6">
                    {aboutMe.bio}
                </p>

                <div className="flex flex-col gap-2">
                    <a
                        href={`mailto:${aboutMe.email}`}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <Mail size={16} />
                        <span>{aboutMe.email}</span>
                    </a>

                    <a
                        href={aboutMe.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <Code size={16} />
                        <span>Github</span>
                    </a>

                    <a
                        href={aboutMe.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <Link size={16} />
                        <span>Linkedin</span>
                    </a>
                </div>
            </div>
        </div>
    )
}