export const  formatUploadDate = uploadDate => {
    const now = new Date();
    const uploadDateTime = new Date(uploadDate);
    const timeDiff = now - uploadDateTime;
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const year = 365 * day;
  
    if (timeDiff < minute) {
      return `${Math.floor(timeDiff / 1000)} s ago`;
    } else if (timeDiff < hour) {
      return `${Math.floor(timeDiff / minute)} m ago`;
    } else if (timeDiff < day) {
      return `${Math.floor(timeDiff / hour)} h ago`;
    } else if (timeDiff < year) {
      return `${Math.floor(timeDiff / day)} d ago`;
    } else {
      return `${Math.floor(timeDiff / year)} y ago`;
    }
  };