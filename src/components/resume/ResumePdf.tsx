import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Link
} from "@react-pdf/renderer";

import user from "../../data/user.json";
import skills from "../../data/skills.json";
import experience from "../../data/experiences.json";
import achievements from "../../data/achievements.json";
import formatDate from "../../utils/formatDate";

import type { Repo } from "../../components/projects/FetchProjects";

interface Props {
    projects: Repo[];
}

const normalizeLink = (url: string) => {
    if (!url.startsWith("http")) {
        return `https://${url}`;
    }
    return url;
};


const styles = StyleSheet.create({
    page: {
        padding: 18,
        fontSize: 10.5,
        fontFamily: "Helvetica",
        lineHeight: 1.3
    },

    header: {
        alignItems: "center",
        marginBottom: 2
    },

    name: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 2,
        lineHeight: 1.1
    },

    title: {
        fontSize: 11,
        textAlign: "center",
        marginBottom: 6,
        color: "#444",
        lineHeight: 1.2
    },

    contactRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        fontSize: 10,
        marginTop: 2,
        marginBottom: 4
    },

    headerLink: {
        color: "#2563eb",
        textDecoration: "underline"
    },

    separator: {
        marginHorizontal: 4
    },

    section: {
        marginTop: 6
    },

    sectionTitle: {
        fontSize: 11,
        fontWeight: "bold",
        borderBottom: "1.5px solid black",
        paddingBottom: 2,
        marginBottom: 8
    },

    summary: {
        fontSize: 10,
    },

    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 2
    },

    bold: {
        fontWeight: "bold"
    },

    italic: {
        fontStyle: "italic"
    },

    projectTitle: {
        fontWeight: "bold",
        color: "black"
    },

    list: {
        marginLeft: 10,
        marginTop: 2
    },

    bullet: {
        flexDirection: "row"
    },

    bulletText: {
        marginLeft: 3,
        fontSize: 10
    },

    smallDate: {
        fontSize: 9
    }
});

export default function ResumePDF({ projects }: Props) {

    const education = achievements.filter(a => a.type === "Education");
    const certifications = achievements.filter(a => a.type !== "Education");

    return (
        <Document>
            <Page size="A4" style={styles.page}>

                {/* HEADER */}

                <View style={styles.header}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.title}>{user.title}</Text>

                    <View style={styles.contactRow}>
                        <Link src={`mailto:${user.contact.email}`}>
                            <Text style={styles.headerLink}>{user.contact.email}</Text>
                        </Link>

                        <Text style={styles.separator}> • </Text>

                        <Link src={`tel:${user.contact.phone}`}>
                            <Text style={styles.headerLink}>{user.contact.phone}</Text>
                        </Link>

                        <Text style={styles.separator}> • </Text>

                        <Link src={normalizeLink(user.social.linkedin)}>
                            <Text style={styles.headerLink}>LinkedIn</Text>
                        </Link>

                        <Text style={styles.separator}> • </Text>

                        <Link src={normalizeLink(user.social.github.url)}>
                            <Text style={styles.headerLink}>GitHub</Text>
                        </Link>

                        <Text style={styles.separator}> • </Text>

                        <Link src={normalizeLink(user.contact.website)}>
                            <Text style={styles.headerLink}>www.{user.contact.website}</Text>
                        </Link>
                    </View>


                </View>

                {/* SUMMARY */}

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Summary</Text>
                    <Text style={styles.summary}>{user.summary}</Text>
                </View>

                {/* SKILLS */}

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Skills</Text>
                    <Text>
                        {skills.map((skill, i) =>
                            `${skill.name}${i !== skills.length - 1 ? " • " : ""}`
                        )}
                    </Text>
                </View>

                {/* EXPERIENCE */}

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Work Experience</Text>

                    {experience.map(exp => (
                        <View key={exp.id} style={{ marginBottom: 5 }}>

                            <View style={styles.rowBetween}>
                                <Text style={styles.bold}>{exp.position}</Text>

                                <Text style={styles.smallDate}>
                                    {exp.startDate} – {exp.isCurrentRole ? "Present" : exp.endDate}
                                </Text>
                            </View>

                            {exp.company && (
                                <Text style={styles.italic}>
                                    {exp.company} {exp.location ? `| ${exp.location}` : ""}
                                </Text>
                            )}

                            {exp.bullets && (
                                <View style={styles.list}>
                                    {exp.bullets.map((bullet, i) => (
                                        <View key={i} style={styles.bullet}>
                                            <Text>•</Text>
                                            <Text style={styles.bulletText}>{bullet}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}

                        </View>
                    ))}
                </View>

                {/* PROJECTS */}

                {projects.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Projects</Text>

                        {projects.map(project => (
                            <View key={project.name} style={{ marginBottom: 5 }}>

                                <View style={styles.rowBetween}>

                                    <Link src={normalizeLink(project.homepage || project.html_url)}>
                                        <Text style={styles.projectTitle}>{project.name.replaceAll("-", " ")}</Text>
                                    </Link>

                                    <Text style={styles.smallDate}>
                                        {formatDate(project.created_at, project.updated_at)}
                                    </Text>
                                </View>

                                <Text style={{ ...styles.italic, fontSize: 9 }}>
                                    <Text style={styles.bold}>Technologies: </Text>
                                    {project.topics
                                        .filter(t => t !== "include")
                                        .slice(0, 4)
                                        .join(", ")}
                                </Text>

                                <Text style={styles.list}>{project.description}</Text>

                            </View>
                        ))}
                    </View>
                )}

                {/* EDUCATION */}

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Education</Text>

                    {education.map(edu => (
                        <View key={edu.id} style={{ marginBottom: 4 }}>

                            <View style={styles.rowBetween}>
                                <Text style={styles.bold}>{edu.name}</Text>
                                <Text style={styles.smallDate}>{edu.time}</Text>
                            </View>

                            <Text style={styles.italic}>{edu.place}</Text>

                            {edu.KeyAchievement && (
                                <View style={styles.list}>
                                    {edu.KeyAchievement.map((item, i) => (
                                        <View key={i} style={styles.bullet}>
                                            <Text>•</Text>
                                            <Text style={styles.bulletText}>{item}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}

                        </View>
                    ))}
                </View>

                {/* CERTIFICATIONS */}

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Certifications</Text>

                    <View style={styles.list}>
                        {certifications.map(cert => (
                            <View key={cert.id} style={styles.bullet}>
                                <Text>•</Text>
                                <Text style={styles.bulletText}>
                                    {cert.name}
                                    {cert.place ? ` — ${cert.place}` : ""}
                                    {cert.time ? ` (${cert.time})` : ""}
                                </Text>
                            </View>
                        ))}
                    </View>

                </View>

            </Page>
        </Document>
    );
}