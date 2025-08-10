        <View style={styles.contactInfo}>
          <Text style={styles.contactItem}>{mockProfile.personalInfo.email}</Text>
          <Text style={styles.contactItem}>|</Text>
          <Text style={styles.contactItem}>{mockProfile.personalInfo.phone}</Text>
          <Text style={styles.contactItem}>|</Text>
          <Text style={styles.contactItem}>{mockProfile.personalInfo.location}</Text>
          <Text style={styles.contactItem}>|</Text>
          <Text style={styles.contactItem}>{mockProfile.personalInfo.linkedin}</Text>
        </View>
      </View>

      {/* Summary */}
      <Text style={styles.firstSectionTitle}>Professional Summary</Text>
      <Text style={styles.summary}>{mockProfile.summary}</Text>

      {/* Experience */}
      <Text style={styles.sectionTitle}>Work Experience</Text>
      {mockProfile.experience.map((job, index) => (
        <View key={index} style={styles.experienceItem}>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.companyInfo}>
            {job.company} • {job.location} • {job.startDate} - {job.endDate}
          </Text>
          {job.description.map((bullet, bulletIndex) => (
            <View key={bulletIndex} style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>{bullet}</Text>
            </View>
          ))}
        </View>
      ))}

      {/* Skills */}
      <Text style={styles.sectionTitle}>Skills</Text>
      <View style={styles.skillsContainer}>
        {mockProfile.skills.map((skill, index) => (
          <Text key={index} style={styles.skillItem}>{skill}</Text>
        ))}
      </View>

      {/* Projects */}
      <Text style={styles.sectionTitle}>Notable Projects</Text>
      {mockProfile.projects?.map((project, index) => (
        <View key={index} style={styles.projectContainer}>
          <Text style={styles.projectTitle}>{project.name}</Text>
          <Text style={styles.projectDescription}>{project.description}</Text>
          <Text style={styles.technologies}>
            Technologies: {project.technologies.join(', ')}
          </Text>
        </View>
      ))}

      {/* Education */}
      <Text style={styles.sectionTitle}>Education</Text>
      {mockProfile.education.map((edu, index) => (
        <View key={index} style={styles.experienceItem}>
          <Text style={styles.jobTitle}>{edu.degree}</Text>
          <Text style={styles.companyInfo}>{edu.school} • {edu.year}</Text>
          {edu.gpa && <Text style={styles.companyInfo}>GPA: {edu.gpa}</Text>}
        </View>
      ))}
    </Page>
  </Document>
);
