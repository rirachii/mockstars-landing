import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 25,
  },
  name: {
    fontSize: 28,
    fontFamily: 'Helvetica',
    color: '#2C3E50',
    marginBottom: 8,
    fontWeight: 300,
  },
  contactInfo: {
    fontSize: 10,
    color: '#666666',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  contactItem: {
    marginRight: 15,
  },
  separator: {
    marginRight: 15,
    marginLeft: 0,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#2C3E50',
    marginBottom: 10,
    marginTop: 20,
  },
  firstSectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#2C3E50',
    marginBottom: 10,
    marginTop: 0,
  },
  summary: {
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.5,
    textAlign: 'justify',
    marginBottom: 15,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  skillsColumn: {
    width: '50%',
    paddingRight: 20,
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  skillBullet: {
    width: 8,
    fontSize: 10,
    color: '#333333',
    marginRight: 8,
  },
  skillText: {
    fontSize: 10,
    color: '#333333',
    flex: 1,
  },
  experienceItem: {
    marginBottom: 18,
  },
  jobHeader: {
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
    marginBottom: 2,
  },
  jobDetails: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 5,
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
    marginRight: 5,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.4,
  },
  educationItem: {
    marginBottom: 12,
  },
  educationTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
    marginBottom: 2,
  },
  educationDetails: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 1,
  },
  educationLocation: {
    fontSize: 10,
    color: '#666666',
  },
  certificationsItem: {
    marginBottom: 8,
  },
  certificationTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
    marginBottom: 2,
  },
  certificationDetails: {
    fontSize: 10,
    color: '#666666',
  },
  projectItem: {
    marginBottom: 12,
  },
  projectName: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
    marginBottom: 2,
  },
  projectDescription: {
    fontSize: 10,
    color: '#333333',
    marginBottom: 2,
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

interface OwenTemplateProps {
  data: ResumeData;
}

export const OwenTemplate: React.FC<OwenTemplateProps> = ({ data }) => {
  // Split skills into two columns
  const splitSkills = (skills: string[]) => {
    const mid = Math.ceil(skills.length / 2);
    return [skills.slice(0, mid), skills.slice(mid)];
  };

  const [leftSkills, rightSkills] = splitSkills(data.skills);

  const formatContactInfo = () => {
    const items = [];
    if (data.personalInfo.email) items.push(data.personalInfo.email);
    if (data.personalInfo.phone) items.push(data.personalInfo.phone);
    if (data.personalInfo.location) items.push(data.personalInfo.location);
    if (data.personalInfo.linkedin) items.push(data.personalInfo.linkedin);
    if (data.personalInfo.website) items.push(data.personalInfo.website);
    
    return items.map((item, index) => (
      <React.Fragment key={index}>
        <Text style={styles.contactItem}>{item}</Text>
        {index < items.length - 1 && <Text style={styles.separator}>|</Text>}
      </React.Fragment>
    ));
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.name}</Text>
          <View style={styles.contactInfo}>
            {formatContactInfo()}
          </View>
        </View>

        {/* Summary Section */}
        {data.summary && (
          <>
            <Text style={styles.firstSectionTitle}>Summary</Text>
            <Text style={styles.summary}>{data.summary}</Text>
          </>
        )}

        {/* Skills Section */}
        {data.skills.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              <View style={styles.skillsColumn}>
                {leftSkills.map((skill, index) => (
                  <View key={index} style={styles.skillItem}>
                    <Text style={styles.skillBullet}>•</Text>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.skillsColumn}>
                {rightSkills.map((skill, index) => (
                  <View key={index} style={styles.skillItem}>
                    <Text style={styles.skillBullet}>•</Text>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}

        {/* Experience Section */}
        <Text style={styles.sectionTitle}>Experience</Text>
        {data.experience.map((job, index) => (
          <View key={index} style={styles.experienceItem}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>
                {job.title} - {job.company} ({job.location || 'Remote'})
              </Text>
              <Text style={styles.jobDetails}>
                {job.startDate} - {job.endDate}
              </Text>
            </View>
            
            <View style={styles.bulletPoints}>
              {job.description.map((bullet, bulletIndex) => (
                <View key={bulletIndex} style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{bullet}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Education and Training Section */}
        {data.education.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Education and Training</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.educationTitle}>{edu.degree}</Text>
                <Text style={styles.educationDetails}>{edu.year}</Text>
                <Text style={styles.educationLocation}>{edu.school}</Text>
                {edu.gpa && <Text style={styles.educationLocation}>GPA: {edu.gpa}</Text>}
              </View>
            ))}
          </>
        )}

        {/* Certifications Section */}
        {data.projects && data.projects.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.projects.map((project, index) => (
              <View key={index} style={styles.certificationsItem}>
                <Text style={styles.certificationTitle}>{project.name}</Text>
                <Text style={styles.certificationDetails}>
                  {project.description} - {project.technologies.join(', ')}
                </Text>
              </View>
            ))}
          </>
        )}
      </Page>
    </Document>
  );
};
