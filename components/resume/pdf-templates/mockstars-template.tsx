import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { TemplateCustomization } from '@/lib/resume/template-customization';

// Register fonts (you'll need to add font files to your public folder)
// Font.register({
//   family: 'Inter',
//   src: '/fonts/Inter-Regular.ttf',
// });

interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    website?: string;
  };
  summary?: string;
  experience: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string[];
    location?: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
    year: string;
    gpa?: string;
  }>;
  skills: string[];
  projects?: Array<{
    name: string;
    description: string;
    technologies: string[];
  }>;
}

interface MockstarsTemplateProps {
  data: ResumeData;
  customization?: TemplateCustomization;
}

export const MockstarsTemplate: React.FC<MockstarsTemplateProps> = ({ 
  data, 
  customization = {
    color: '#397DC2',
    fontSize: 'default',
    fontFamily: 'Helvetica',
    sectionSpacing: 16,
    paragraphSpacing: 8,
    lineSpacing: 1.4
  }
}) => {
  // Calculate font sizes based on customization
  const getFontSize = (baseSize: number) => {
    const multiplier = customization.fontSize === 'small' ? 0.9 : 
                     customization.fontSize === 'large' ? 1.1 : 1;
    return baseSize * multiplier;
  };

  // Create dynamic styles based on customization
  const createStyles = () => StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      padding: 40,
      fontFamily: customization.fontFamily || 'Helvetica',
    },
    header: {
      marginBottom: customization.sectionSpacing,
      borderBottom: 2,
      borderBottomColor: customization.color,
      paddingBottom: 10,
    },
    name: {
      fontSize: getFontSize(24),
      fontWeight: 'bold',
      color: customization.color,
      marginBottom: 5,
      lineHeight: customization.lineSpacing,
    },
    title: {
      fontSize: getFontSize(14),
      color: '#666666',
      marginBottom: 10,
      lineHeight: customization.lineSpacing,
    },
    contact: {
      fontSize: getFontSize(10),
      color: '#666666',
      flexDirection: 'row',
      justifyContent: 'space-between',
      lineHeight: customization.lineSpacing,
    },
    section: {
      marginTop: customization.sectionSpacing,
      marginBottom: customization.paragraphSpacing,
    },
    sectionTitle: {
      fontSize: getFontSize(14),
      fontWeight: 'bold',
      color: customization.color,
      marginBottom: customization.paragraphSpacing,
      textTransform: 'uppercase',
      borderBottom: 1,
      borderBottomColor: customization.color,
      paddingBottom: 2,
      lineHeight: customization.lineSpacing,
    },
    experienceItem: {
      marginBottom: customization.paragraphSpacing + 4,
    },
    jobTitle: {
      fontSize: getFontSize(12),
      fontWeight: 'bold',
      color: '#333333',
      lineHeight: customization.lineSpacing,
    },
    company: {
      fontSize: getFontSize(11),
      color: '#666666',
      marginBottom: 2,
      lineHeight: customization.lineSpacing,
    },
    dates: {
      fontSize: getFontSize(10),
      color: '#888888',
      marginBottom: 4,
      lineHeight: customization.lineSpacing,
    },
    description: {
      fontSize: getFontSize(10),
      lineHeight: customization.lineSpacing,
      color: '#333333',
    },
    skillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 5,
    },
    skill: {
      fontSize: getFontSize(10),
      backgroundColor: '#f0f0f0',
      padding: 3,
      borderRadius: 3,
      marginRight: 5,
      marginBottom: 5,
      lineHeight: customization.lineSpacing,
    },
    bulletPoint: {
      fontSize: getFontSize(10),
      marginBottom: 3,
      color: '#333333',
      paddingLeft: 10,
      lineHeight: customization.lineSpacing,
    },
  });

  const styles = createStyles();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.name}</Text>
          <Text style={styles.title}>{data.personalInfo.title}</Text>
          <View style={styles.contact}>
            <Text>{data.personalInfo.email}</Text>
            <Text>{data.personalInfo.phone}</Text>
            <Text>{data.personalInfo.location}</Text>
          </View>
        </View>

        {/* Summary Section */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.description}>{data.summary}</Text>
          </View>
        )}

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {data.experience.map((job, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.company}>{job.company} | {job.location}</Text>
              <Text style={styles.dates}>{job.startDate} - {job.endDate}</Text>
              {job.description.map((bullet, bulletIndex) => (
                <Text key={bulletIndex} style={styles.bulletPoint}>
                  • {bullet}
                </Text>
              ))}
            </View>
          ))}
        </View>

        {/* Education Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{edu.degree}</Text>
              <Text style={styles.company}>{edu.school}</Text>
              <Text style={styles.dates}>{edu.year}</Text>
              {edu.gpa && <Text style={styles.description}>GPA: {edu.gpa}</Text>}
            </View>
          ))}
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          <View style={styles.skillsContainer}>
            {data.skills.map((skill, index) => (
              <Text key={index} style={styles.skill}>{skill}</Text>
            ))}
          </View>
        </View>

        {/* Projects Section */}
        {data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((project, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.jobTitle}>{project.name}</Text>
                <Text style={styles.description}>{project.description}</Text>
                <Text style={styles.company}>
                  Technologies: {project.technologies.join(', ')}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};
