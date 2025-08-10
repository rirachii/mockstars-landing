import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#1E1E1E',
    padding: 40,
    fontFamily: 'Courier',
    fontSize: 10,
    lineHeight: 1.4,
    color: '#CCCCCC',
  },
  header: {
    marginBottom: 25,
    borderBottom: '1px solid #333333',
    paddingBottom: 15,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Courier-Bold',
    color: '#00FF00',
    marginBottom: 8,
    letterSpacing: 1,
  },
  contactInfo: {
    fontSize: 9,
    color: '#CCCCCC',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  contactItem: {
    marginRight: 15,
  },
  separator: {
    marginRight: 15,
    marginLeft: 0,
    color: '#666666',
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Courier-Bold',
    color: '#00FF00',
    marginBottom: 10,
    marginTop: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottom: '1px solid #333333',
    paddingBottom: 3,
  },
  firstSectionTitle: {
    fontSize: 11,
    fontFamily: 'Courier-Bold',
    color: '#00FF00',
    marginBottom: 10,
    marginTop: 0,
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottom: '1px solid #333333',
    paddingBottom: 3,
  },
  summary: {
    fontSize: 10,
    color: '#CCCCCC',
    lineHeight: 1.5,
    textAlign: 'justify',
    marginBottom: 15,
    fontStyle: 'italic',
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
    fontSize: 10,
    color: '#00FF00',
    marginRight: 8,
  },
  skillText: {
    fontSize: 10,
    color: '#CCCCCC',
    flex: 1,
  },
  experienceItem: {
    marginBottom: 18,
    backgroundColor: '#2A2A2A',
    padding: 10,
    borderLeft: '3px solid #00FF00',
  },
  jobHeader: {
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 11,
    fontFamily: 'Courier-Bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  jobDetails: {
    fontSize: 9,
    color: '#999999',
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
    color: '#00FF00',
    marginRight: 5,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: '#CCCCCC',
    lineHeight: 1.4,
  },
  educationItem: {
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#2A2A2A',
  },
  educationTitle: {
    fontSize: 11,
    fontFamily: 'Courier-Bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  educationDetails: {
    fontSize: 10,
    color: '#999999',
    marginBottom: 1,
  },
  educationLocation: {
    fontSize: 9,
    color: '#999999',
  },
  projectItem: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#2A2A2A',
    borderLeft: '2px solid #666666',
  },
  projectName: {
    fontSize: 10,
    fontFamily: 'Courier-Bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  projectDescription: {
    fontSize: 10,
    color: '#CCCCCC',
    marginBottom: 2,
  },
  technologies: {
    fontSize: 9,
    color: '#00FF00',
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

interface TheGilfoyleTemplateProps {
  data: ResumeData;
}

export const TheGilfoyleTemplate: React.FC<TheGilfoyleTemplateProps> = ({ data }) => {
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
          <Text style={styles.name}>{data.personalInfo.name.toUpperCase()}</Text>
          <View style={styles.contactInfo}>
            {formatContactInfo()}
          </View>
        </View>

        {/* Summary Section */}
        {data.summary && (
          <>
            <Text style={styles.firstSectionTitle}>// Summary</Text>
            <Text style={styles.summary}>{data.summary}</Text>
          </>
        )}

        {/* Skills Section */}
        {data.skills.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>// Skills</Text>
            <View style={styles.skillsContainer}>
              <View style={styles.skillsColumn}>
                {leftSkills.map((skill, index) => (
                  <View key={index} style={styles.skillItem}>
                    <Text style={styles.skillBullet}>{'>'}</Text>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.skillsColumn}>
                {rightSkills.map((skill, index) => (
                  <View key={index} style={styles.skillItem}>
                    <Text style={styles.skillBullet}>{'>'}</Text>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}

        {/* Experience Section */}
        <Text style={styles.sectionTitle}>// Experience</Text>
        {data.experience.map((job, index) => (
          <View key={index} style={styles.experienceItem}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>
                {job.title} @ {job.company}
              </Text>
              <Text style={styles.jobDetails}>
                {job.startDate} - {job.endDate} | {job.location || 'Remote'}
              </Text>
            </View>
            
            <View style={styles.bulletPoints}>
              {job.description.map((bullet, bulletIndex) => (
                <View key={bulletIndex} style={styles.bulletPoint}>
                  <Text style={styles.bullet}>{'>'}</Text>
                  <Text style={styles.bulletText}>{bullet}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Education Section */}
        {data.education.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>// Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.educationTitle}>{edu.degree}</Text>
                <Text style={styles.educationDetails}>{edu.school}</Text>
                <Text style={styles.educationLocation}>{edu.year} {edu.gpa && `| GPA: ${edu.gpa}`}</Text>
              </View>
            ))}
          </>
        )}

        {/* Projects Section */}
        {data.projects && data.projects.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>// Projects</Text>
            {data.projects.map((project, index) => (
              <View key={index} style={styles.projectItem}>
                <Text style={styles.projectName}>{project.name}</Text>
                <Text style={styles.projectDescription}>{project.description}</Text>
                <Text style={styles.technologies}>
                  // {project.technologies.join(', ')}
                </Text>
              </View>
            ))}
          </>
        )}
      </Page>
    </Document>
  );
};
