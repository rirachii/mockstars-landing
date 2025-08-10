import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.4,
  },
  header: {
    backgroundColor: '#4A148C',
    color: '#ffffff',
    textAlign: 'center',
    paddingVertical: 30,
    paddingHorizontal: 40,
    marginBottom: 0,
  },
  name: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 3,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 14,
    fontStyle: 'italic',
    letterSpacing: 1,
  },
  content: {
    flexDirection: 'row',
    padding: 40,
    paddingTop: 30,
  },
  leftColumn: {
    width: '30%',
    paddingRight: 25,
  },
  rightColumn: {
    width: '70%',
    paddingLeft: 15,
  },
  leftSectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
    marginBottom: 12,
    marginTop: 20,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  rightSectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
    marginBottom: 12,
    marginTop: 20,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  firstSectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
    marginBottom: 12,
    marginTop: 0,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contactInfo: {
    textAlign: 'center',
    marginBottom: 20,
  },
  contactItem: {
    fontSize: 10,
    color: '#333333',
    marginBottom: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactIcon: {
    width: 12,
    marginRight: 5,
    fontSize: 10,
    color: '#666666',
  },
  educationItem: {
    textAlign: 'center',
    marginBottom: 15,
  },
  degree: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
    marginBottom: 2,
  },
  school: {
    fontSize: 10,
    color: '#333333',
    marginBottom: 2,
  },
  educationDate: {
    fontSize: 9,
    color: '#666666',
    marginBottom: 2,
  },
  location: {
    fontSize: 9,
    color: '#666666',
    marginBottom: 2,
  },
  gpa: {
    fontSize: 9,
    color: '#666666',
  },
  skillsSection: {
    textAlign: 'center',
  },
  skillItem: {
    fontSize: 10,
    color: '#333333',
    marginBottom: 3,
    textAlign: 'center',
  },
  objectiveText: {
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.5,
    textAlign: 'justify',
    marginBottom: 20,
  },
  experienceItem: {
    marginBottom: 20,
  },
  jobTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
    marginBottom: 2,
  },
  companyInfo: {
    fontSize: 10,
    color: '#333333',
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
  coloredBullet: {
    width: 12,
    fontSize: 12,
    marginRight: 5,
    marginTop: 1,
  },
  redBullet: {
    color: '#D32F2F',
  },
  greenBullet: {
    color: '#388E3C',
  },
  orangeBullet: {
    color: '#F57C00',
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.4,
  },
  projectsSection: {
    marginTop: 15,
  },
  projectItem: {
    marginBottom: 18,
  },
  projectHeader: {
    marginBottom: 5,
  },
  projectName: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
    marginBottom: 2,
  },
  projectDetails: {
    fontSize: 10,
    color: '#333333',
    marginBottom: 2,
  },
  projectDate: {
    fontSize: 10,
    color: '#333333',
    marginBottom: 8,
  },
  projectBullets: {
    marginTop: 3,
  },
  projectBullet: {
    flexDirection: 'row',
    marginBottom: 3,
    alignItems: 'flex-start',
  },
  projectBulletSymbol: {
    width: 10,
    fontSize: 10,
    color: '#333333',
    marginRight: 5,
  },
  projectBulletText: {
    flex: 1,
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.3,
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

interface SiliconIvyTemplateProps {
  data: ResumeData;
}

export const SiliconIvyTemplate: React.FC<SiliconIvyTemplateProps> = ({ data }) => {
  // Function to get bullet color based on index
  const getBulletStyle = (index: number) => {
    const colors = [styles.redBullet, styles.greenBullet, styles.orangeBullet];
    return [styles.coloredBullet, colors[index % colors.length]];
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Purple Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.name.toUpperCase()}</Text>
          <Text style={styles.headerTitle}>{data.personalInfo.title.toUpperCase()}</Text>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Contact Section */}
            <Text style={styles.firstSectionTitle}>Contact</Text>
            <View style={styles.contactInfo}>
              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>✉</Text>
                <Text>{data.personalInfo.email}</Text>
              </View>
              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>📞</Text>
                <Text>{data.personalInfo.phone}</Text>
              </View>
              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>📍</Text>
                <Text>{data.personalInfo.location}</Text>
              </View>
              {data.personalInfo.linkedin && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactIcon}>💼</Text>
                  <Text>{data.personalInfo.linkedin}</Text>
                </View>
              )}
              {data.personalInfo.website && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactIcon}>🌐</Text>
                  <Text>{data.personalInfo.website}</Text>
                </View>
              )}
            </View>

            {/* Education Section */}
            <Text style={styles.leftSectionTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.degree}>{edu.degree}</Text>
                <Text style={styles.school}>{edu.school}</Text>
                <Text style={styles.educationDate}>{edu.year}</Text>
                {edu.gpa && <Text style={styles.gpa}>GPA: {edu.gpa}</Text>}
              </View>
            ))}

            {/* Skills Section */}
            <Text style={styles.leftSectionTitle}>Skills</Text>
            <View style={styles.skillsSection}>
              {data.skills.map((skill, index) => (
                <Text key={index} style={styles.skillItem}>{skill}</Text>
              ))}
            </View>
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Career Objective */}
            {data.summary && (
              <>
                <Text style={styles.firstSectionTitle}>Career Objective</Text>
                <Text style={styles.objectiveText}>{data.summary}</Text>
              </>
            )}

            {/* Work Experience Section */}
            <Text style={styles.rightSectionTitle}>Work Experience</Text>
            {data.experience.map((job, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.companyInfo}>
                  {job.company} • {job.startDate} - {job.endDate} • {job.location || 'Remote'}
                </Text>
                
                <View style={styles.bulletPoints}>
                  {job.description.map((bullet, bulletIndex) => (
                    <View key={bulletIndex} style={styles.bulletPoint}>
                      <Text style={getBulletStyle(bulletIndex)}>●</Text>
                      <Text style={styles.bulletText}>{bullet}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}

            {/* Projects Section */}
            {data.projects && data.projects.length > 0 && (
              <View style={styles.projectsSection}>
                <Text style={styles.rightSectionTitle}>Projects</Text>
                {data.projects.map((project, index) => (
                  <View key={index} style={styles.projectItem}>
                    <View style={styles.projectHeader}>
                      <Text style={styles.projectName}>{project.name}</Text>
                      <Text style={styles.projectDetails}>{project.description}</Text>
                      <Text style={styles.projectDate}>
                        Technologies: {project.technologies.join(', ')}
                      </Text>
                    </View>
                    
                    <View style={styles.projectBullets}>
                      <View style={styles.projectBullet}>
                        <Text style={styles.projectBulletSymbol}>•</Text>
                        <Text style={styles.projectBulletText}>
                          Built using {project.technologies.slice(0, 2).join(' and ')} 
                          {project.technologies.length > 2 && ` and ${project.technologies.length - 2} other technologies`}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};
