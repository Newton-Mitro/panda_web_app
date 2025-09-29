import { Link } from '@inertiajs/react';
import React from 'react';
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { Team } from '../../../types/team';

interface TeamCardItemProps {
    member: Team;
    index: number;
}

const TeamCardItem: React.FC<TeamCardItemProps> = ({ member, index }) => {
    const socials = [
        { icon: <FaFacebookF />, link: member.facebook_links },
        { icon: <FaTwitter />, link: member.twitter_links },
        { icon: <FaLinkedinIn />, link: member.linkedin_links },
        { icon: <FaInstagram />, link: member.instagram_links },
        { icon: <FaYoutube />, link: member.youtube_links },
        { icon: <FaWhatsapp />, link: member.whatsapp_links },
        { icon: <FaGithub />, link: member.github_links },
    ].filter((s) => s.link);

    return (
        <div className="group flex cursor-pointer flex-col items-center md:relative md:flex-row">
            {index % 2 === 0 ? (
                <div
                    className={`group clear-both flex w-full ${index % 2 !== 0 ? 'flex-col-reverse' : 'flex-col'} items-center group-hover:cursor-pointer md:relative md:flex-row`}
                >
                    <img
                        src={member?.media?.url ?? 'https://t3.ftcdn.net/jpg/01/06/12/68/360_F_106126874_6Yl8PyFmYgoOAx7DYoH6zs5a3MoFvQHr.jpg'}
                        alt="Custom Shape"
                        style={{
                            clipPath: 'polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)',
                        }}
                        className={`borderobject-cover z-10 mt-6 mb-6 h-72 w-72 border-6 bg-card shadow-lg transition-transform duration-300 group-hover:scale-105 md:absolute md:h-96 md:w-96`}
                        // border-4 for thickness, border-blue-500 for color, adjust as needed
                    />
                    <div className="flex min-h-62 w-full flex-col justify-center rounded-2xl border-1 border-border bg-card p-6 md:ml-72 md:pl-32">
                        <div className="">
                            <Link href={route('site.teams.show', member.id)} className="">
                                <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                                <p className="text-sm font-semibold text-primary">{member.designation}</p>
                                {member.department && <p className="mt-1 text-xs text-muted-foreground">{member.department}</p>}

                                <div className="prose prose-sm mt-3 text-muted-foreground [&_h1,h2,h3,h4,h5,h6]:text-foreground [&_table]:border [&_table]:border-gray-500 [&_td]:border [&_td]:border-gray-500 [&_th]:border [&_th]:border-gray-500">
                                    {member.bio || 'No bio available.'}
                                </div>
                            </Link>

                            {/* Socials */}
                            {socials.length > 0 && (
                                <div className="mt-4 flex space-x-2">
                                    {socials.map((s, idx) => (
                                        <a
                                            key={idx}
                                            href={s.link as string}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded-full bg-muted/50 p-2 text-muted-foreground transition-colors hover:bg-accent"
                                        >
                                            {s.icon}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className={`group clear-both flex w-full ${index % 2 !== 0 ? 'flex-col-reverse' : 'flex-col'} items-center group-hover:cursor-pointer md:relative md:flex-row`}
                >
                    <div className="flex min-h-62 w-full flex-col justify-center rounded-2xl border-1 border-border bg-card p-6 md:mr-72 md:pr-32">
                        <div className="flex flex-col items-end justify-center text-right">
                            <Link href={route('site.teams.show', member.id)} className="">
                                <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                                <p className="text-sm font-semibold text-primary">{member.designation}</p>
                                {member.department && <p className="mt-1 text-xs text-muted-foreground">{member.department}</p>}

                                <div className="prose prose-sm mt-3 text-muted-foreground [&_h1,h2,h3,h4,h5,h6]:text-foreground [&_table]:border [&_table]:border-gray-500 [&_td]:border [&_td]:border-gray-500 [&_th]:border [&_th]:border-gray-500">
                                    {member.bio || 'No bio available.'}
                                </div>
                            </Link>

                            {/* Socials */}
                            {socials.length > 0 && (
                                <div className="mt-4 flex space-x-2">
                                    {socials.map((s, idx) => (
                                        <a
                                            key={idx}
                                            href={s.link as string}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded-full bg-muted/50 p-2 text-muted-foreground transition-colors hover:bg-accent"
                                        >
                                            {s.icon}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <img
                        src={member?.media?.url}
                        alt="Custom Shape"
                        style={{
                            clipPath: 'polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)',
                        }}
                        className={`borderobject-cover right-0 z-10 mt-6 mb-6 h-72 w-72 border-6 bg-card shadow-lg transition-transform duration-300 group-hover:scale-105 md:absolute md:h-96 md:w-96`}
                        // border-4 for thickness, border-blue-500 for color, adjust as needed
                    />
                </div>
            )}
        </div>

        // <div className="group relative h-[360px] w-[360px] rotate-45 transform overflow-hidden transition-all duration-500 hover:shadow">
        //     <img
        //         src={member.media?.url || 'https://via.placeholder.com/300'}
        //         alt={member.name}
        //         className="absolute top-0 left-0 h-full w-full -rotate-45 object-cover transition-transform duration-700 group-hover:scale-105"
        //     />

        //     {/* Inner content container rotated back and centered */}
        //     <div className="absolute inset-0 flex items-center justify-center">
        //         <div className="w-72 rotate-[-45deg] rounded-lg bg-black/50 p-4 text-center transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100">
        //             <h3 className="text-lg font-bold text-white">{member.name}</h3>
        //             <p className="text-sm text-gray-200">{member.designation}</p>
        //             {member.department && <p className="mt-1 text-xs text-gray-300">{member.department}</p>}

        //             <div className="mt-3 flex justify-center space-x-2">
        //                 {socials.map((s, i) => (
        //                     <a
        //                         key={i}
        //                         href={s.link as string}
        //                         target="_blank"
        //                         rel="noopener noreferrer"
        //                         className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white"
        //                     >
        //                         {s.icon}
        //                     </a>
        //                 ))}
        //             </div>
        //         </div>
        //     </div>

        //     <div className="pointer-events-none absolute inset-0 -rotate-45 rounded-lg border-2 border-white/30"></div>
        // </div>

        // <div className="group relative w-full max-w-sm overflow-hidden rounded-3xl bg-white/10 p-6 shadow-xl backdrop-blur-md hover:shadow-2xl">
        //     <div className="absolute -top-12 -left-12 h-32 w-32 animate-pulse rounded-full bg-purple-400/50 blur-3xl"></div>
        //     <div className="absolute -right-12 -bottom-12 h-32 w-32 animate-pulse rounded-full bg-pink-400/50 blur-3xl"></div>

        //     <div className="relative flex flex-col items-center text-center">
        //         <img
        //             src={member.media?.url || 'https://via.placeholder.com/150'}
        //             alt={member.name}
        //             className="h-28 w-28 rounded-full object-cover ring-4 ring-white/30 transition-transform duration-500 group-hover:scale-110"
        //         />
        //         <h3 className="mt-4 text-xl font-bold text-white">{member.name}</h3>
        //         <p className="text-sm text-gray-200">{member.designation}</p>
        //         <p className="mt-2 line-clamp-3 text-xs text-gray-300">{member.message}</p>

        //         <div className="mt-4 flex space-x-2 opacity-0 transition group-hover:opacity-100">
        //             {socials.map((s, i) => (
        //                 <a
        //                     key={i}
        //                     href={s.link as string}
        //                     target="_blank"
        //                     rel="noopener noreferrer"
        //                     className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white"
        //                 >
        //                     {s.icon}
        //                 </a>
        //             ))}
        //         </div>
        //     </div>
        // </div>

        // <div className="group relative w-full max-w-sm overflow-hidden rounded-2xl border bg-card p-6 shadow-lg backdrop-blur-md transition hover:shadow-xl">
        //     <div className="flex flex-col items-center text-center">
        //         <img
        //             src={member.media?.url || 'https://via.placeholder.com/150'}
        //             alt={member.name}
        //             className="h-28 w-28 rounded-full object-cover ring-4 ring-white/30 transition-transform duration-500 group-hover:scale-110"
        //         />
        //         <h3 className="mt-4 text-xl font-semibold text-white">{member.name}</h3>
        //         <p className="text-sm text-gray-300">{member.designation}</p>
        //         <p className="mt-2 line-clamp-3 text-xs text-gray-400">{member.message}</p>
        //     </div>

        //     {/* socials */}
        //     {socials.length > 0 && (
        //         <div className="mt-4 flex justify-center space-x-3">
        //             {socials.map((s, i) => (
        //                 <a
        //                     key={i}
        //                     href={s.link as string}
        //                     target="_blank"
        //                     rel="noopener noreferrer"
        //                     className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-primary"
        //                 >
        //                     {s.icon}
        //                 </a>
        //             ))}
        //         </div>
        //     )}
        // </div>
    );
};

export default TeamCardItem;
