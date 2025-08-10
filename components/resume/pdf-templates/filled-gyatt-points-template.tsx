// Gyatt Points Template Filled Example - Over-the-top Creative Style
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { mockProfile } from './mock-profile';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FF69B4',
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 12,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 25,
    textAlign: 'center',
    backgroundColor: '#FFD700',
    padding: 25,
    borderRadius: 25,
    border: '5px solid #FF1493',
  },
  name: {
    fontSize: 32,
    fontFamily: 'Helvetica-Bold',
    color: '#FF1493',
    marginBottom: 10,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 18,
    color: '#FF4500',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  contact: {
    fontSize: 12,
    color: '#8B0000',
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#FFE4E1',
    padding: 15,
    borderRadius: 15,
    border: '3px solid #FF1493',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#8B0000',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'center',
  },
  experienceItem: {
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
    border: '2px solid #FF69B4',
  },
  jobTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#8B0000',
    marginBottom: 5,
  },
  company: {
    fontSize: 12,
    color: '#FF1493',
    marginBottom: 5,
  },
  bulletPoint: {
    fontSize: 10,
    color: '#333333',
    marginBottom: 3,
    paddingLeft: 15,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  skill: {
    fontSize: 10,
    backgroundColor: '#FF1493',
    color: '#FFFFFF',
    padding: 5,
    margin: 3,
    borderRadius: 8,
    fontFamily: 'Helvetica-Bold',
  },
  summary: {
    fontSize: 11,
    color: '#333333',
    textAlign: 'center',
    lineHeight: 1.5,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
    border: '2px solid #FF69B4',
  },
});

export const FilledGyattPointsTemplate: React.FC = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>⭐ {mockProfile.personalInfo.name} ⭐</Text>
        <Text style={styles.title}>🔥 {mockProfile.personalInfo.title} 🔥</Text>
        <Text style={styles.contact}>📧 {mockProfile.personalInfo.email}</Text>
        <Text style={styles.contact}>📱 {mockProfile.personalInfo.phone}</Text>
        <Text style={styles.contact}>📍 {mockProfile.personalInfo.location}</Text>
        <Text style={styles.contact}>💼 {mockProfile.personalInfo.linkedin}</Text>
      </View>

      {/* Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🚀 ABOUT THIS LEGEND 🚀</Text>
        <Text style={styles.summary}>{mockProfile.summary}</Text>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💼 WHERE THE MAGIC HAPPENED 💼</Text>
        {mockProfile.experience.map((job, index) => (
          <View key={index} style={styles.experienceItem}>
            <Text style={styles.jobTitle}>🎯 {job.title}</Text>
            <Text style={styles.company}>🏢 {job.company} | {job.startDate} - {job.endDate}</Text>
            {job.description.map((bullet, bulletIndex) => (
              <Text key={bulletIndex} style={styles.bulletPoint}>
                ⚡ {bullet}
              </Text>
            ))}
          </View>
        ))}
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🛠️ SUPERPOWERS 🛠️</Text>
        <View style={styles.skillsContainer}>
          {mockProfile.skills.slice(0, 20).map((skill, index) => (
            <Text key={index} style={styles.skill}>✨ {skill}</Text>
          ))}
        </View>
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎓 BRAIN GAINS 🎓</Text>
        {mockProfile.education.map((edu, index) => (
          <View key={index} style={styles.experienceItem}>
            <Text style={styles.jobTitle}>📚 {edu.degree}</Text>
            <Text style={styles.company}>🏫 {edu.school} | {edu.year}</Text>
            {edu.gpa && <Text style={styles.bulletPoint}>🌟 GPA: {edu.gpa}</Text>}
          </View>
        ))}
      </View>

      {/* Projects */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🚀 EPIC BUILDS 🚀</Text>
        {mockProfile.projects?.slice(0, 2).map((project, index) => (
          <View key={index} style={styles.experienceItem}>
            <Text style={styles.jobTitle}>💫 {project.name}</Text>
            <Text style={styles.bulletPoint}>📝 {project.description}</Text>
            <Text style={styles.bulletPoint}>
              🔧 {project.technologies.join(' • ')}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);
