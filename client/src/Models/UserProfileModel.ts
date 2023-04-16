export interface postType {
  _id: string;
  creatorID: string;
  isJobListing: boolean;
  position: string;
  text: string;
  image: string;
  likes: string[];
  comments: {
    commenter: string;
    comment: string;
  }[];
  preferenceTags: { type: string }[];
  uploadDeadline: Date;
  isThirdParty: boolean;
  thirdPartyLink: string;
  isResumeRequired: boolean;
  isCoverLetterRequired: boolean;
  applications: applicationType[];
  createdAt: string;
  updatedAt: string;
}

export default interface Usertypes {
  user_id?: string;
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  connections: string[];
  picture: string;
  backdrop: string;
  summary: string;
  preferenceTags: string[];
  projects: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    technologies: string;
    picture: string;
  }[];
  skills: {
    name: string;
    level: string;
  }[];
  experience: {
    company: string;
    logo: string;
    title: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    school: string;
    logo: string;
    degree: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  languages: {
    name: string;
    level: string;
  }[];
  awards: {
    title: string;
    date: string;
    awarder: string;
    summary: string;
  }[];
  courses: {
    title: string;
    number: string;
    school: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  applications: applicationType[];
  posts: postType[];
}

export interface applicationType {
  applicantID: string;
  coverLetter: string;
  createdAt: string;
  existingInfo: boolean;
  postID: string;
  resume: string;
  updatedAt: string;
  _id: string;
}

export interface notificationType {
  user_id: string;
  initiatorID: string;
  type: string;
  isRead: boolean;
  initiator: {
    name: string;
    picture: string;
    user_id: string;
  };
}
