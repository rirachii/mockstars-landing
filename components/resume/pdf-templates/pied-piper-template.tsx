import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FAFAFA',
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 25,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: '#00A651',
    marginBottom: 8,
  },
  contactInfo: {
    flexDirection: 'row',
    fontSize: 10,
    color: '#666666',
    marginBottom: 15,
    flexWrap: 'wrap',
  },
  contactItem: {
    marginRight: 15,
  },
  jobTitle: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#00A651',
    marginBottom: 12,
  },
  summary: {
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.5,
    textAlign: 'justify',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#00A651',
    marginTop: 20,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  experienceItem: {
    marginBottom: 18,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 3,
  },
  jobPosition: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
    flex: 1,
  },
  dateRange: {
    fontSize: 10,
    color: '#666666',
    textAlign: 'right',
    minWidth: 100,
  },
  company: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 8,
  },
  bulletPoints: {
    marginTop: 5,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'flex-start',
  },
  bullet: {
    width: 10,
    fontSize: 10,
    color: '#333333',
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.4,
  },
  skillsSection: {
    marginTop: 15,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  skillColumn: {
    width: '48%',
  },
  skillItem: {
    fontSize: 10,
    color: '#333333',
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillBullet: {
    width: 8,
    fontSize: 10,
    color: '#333333',
    marginRight: 5,
  },
  skillText: {
    flex: 1,
  },
  certificationsSection: {
    marginTop: 20,
  },
  certificationItem: {
    marginBottom: 8,
  },
  certificationTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
  },
  certificationDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  certificationOrg: {
    fontSize: 10,
    color: '#666666',
  },
  certificationDate: {
    fontSize: 10,
    color: '#666666',
  },
  educationSection: {
    marginTop: 20,
  },
  educationItem: {
    marginBottom: 12,
  },
  degreeTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
    marginBottom: 2,
  },
  educationDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  schoolName: {
    fontSize: 10,
    color: '#666666',
  },
  graduationDate: {
    fontSize: 10,
    color: '#666666',
  },
  concentrations: {
    fontSize: 10,
    color: '#333333',
    marginLeft: 10,
  },
  concentrationItem: {
    marginBottom: 2,
  },
  projectItem: {
    marginBottom: 12,
  },
  projectName: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
    marginBottom: 3,
  },
  projectDescription: {
    fontSize: 10,
    color: '#333333',
    marginBottom: 3,
  },
  technologies: {
    fontSize: 9,
    color: '#666666',
    fontStyle: 'italic',
  },
});

interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    links?: Array<{ id: string; label: string; url: string }>;
  };
  summary?: string;
  experience: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    bullets: Array<{ text: string }>;
    location?: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
    startYear: string;
    endYear: string;
    gpa?: string;
  }>;
  skills: string[];
  projects?: Array<{
    name: string;
    description: string;
    technologies: string[];
  }>;
}

interface PiedPiperTemplateProps {
  data: ResumeData;
}

export const PiedPiperTemplate: React.FC<PiedPiperTemplateProps> = ({ data }) => {
  // Split skills into two columns for better layout
  const splitSkills = (skills: string[]) => {
    const mid = Math.ceil(skills.length / 2);
    return [skills.slice(0, mid), skills.slice(mid)];
  };

  const [leftSkills, rightSkills] = splitSkills(data.skills);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.name}</Text>
          
          <View style={styles.contactInfo}>
            <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
            <Text style={styles.contactItem}>•</Text>
            <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
            <Text style={styles.contactItem}>•</Text>
            {(data.personalInfo.links || []).map((l) => (
              <Text key={l.id} style={styles.contactItem}>{l.label}: {l.url}</Text>
            ))}
          </View>

          <Text style={styles.jobTitle}>{data.personalInfo.title}</Text>
          
          {data.summary && (
            <Text style={styles.summary}>{data.summary}</Text>
          )}
        </View>

        {/* Work Experience Section */}
        <Text style={styles.sectionTitle}>Work Experience</Text>
        {data.experience.map((job, index) => (
          <View key={index} style={styles.experienceItem}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobPosition}>{job.title}</Text>
              <Text style={styles.dateRange}>
                {job.startDate} – {job.endDate}
              </Text>
            </View>
            <Text style={styles.company}>{job.company}</Text>
            
            <View style={styles.bulletPoints}>
              {(job.bullets || []).map((b, bulletIndex) => (
                <Text key={bulletIndex} style={styles.bullet}>
                  • {b.text}
                </Text>
              ))}
            </View>
          </View>
        ))}

        {/* Skills Section */}
        {data.skills.length > 0 && (
          <View style={styles.skillsSection}>
            <Text style={styles.sectionTitle}>Skills & Competencies</Text>
            <View style={styles.skillsGrid}>
              <View style={styles.skillColumn}>
                {leftSkills.map((skill, index) => (
                  <View key={index} style={styles.skillItem}>
                    <Text style={styles.skillBullet}>•</Text>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.skillColumn}>
                {rightSkills.map((skill, index) => (
                  <View key={index} style={styles.skillItem}>
                    <Text style={styles.skillBullet}>•</Text>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Projects Section */}
        {data.projects && data.projects.length > 0 && (
          <View style={styles.certificationsSection}>
            <Text style={styles.sectionTitle}>Courses / Certifications</Text>
            {data.projects.map((project, index) => (
              <View key={index} style={styles.certificationItem}>
                <Text style={styles.certificationTitle}>{project.name}</Text>
                <View style={styles.certificationDetails}>
                  <Text style={styles.certificationOrg}>{project.description}</Text>
                  <Text style={styles.certificationDate}>
                    {project.technologies.join(', ')}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Education Section */}
        {data.education.length > 0 && (
          <View style={styles.educationSection}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.degreeTitle}>{edu.degree}</Text>
                <View style={styles.educationDetails}>
                  <Text style={styles.schoolName}>{edu.school}</Text>
                  <Text style={styles.graduationDate}>{[edu.startYear, edu.endYear].filter(Boolean).join(' - ')}</Text>
                </View>
                {edu.gpa && (
                  <View style={styles.concentrations}>
                    <Text style={styles.concentrationItem}>GPA: {edu.gpa}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};
