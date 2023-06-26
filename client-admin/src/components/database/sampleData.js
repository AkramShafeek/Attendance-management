export const depts = [
  {
    "_id": {
      "$oid": "648cc0e9b6edc9fb04c08404"
    },
    "deptName": "Computer Science and Engineering",
    "deptId": "CSE",
    "__v": 0
  },
  {
    "_id": {
      "$oid": "648cc10d476123d67be2094a"
    },
    "deptName": "Information Science and Engineering",
    "deptId": "ISE",
    "__v": 0
  },
  {
    "_id": {
      "$oid": "648cc10d476123d67be2094a"
    },
    "deptName": "Electronics and Communication Engineering",
    "deptId": "ECE",
    "__v": 0
  },
  {
    "_id": {
      "$oid": "648cc10d476123d67be2094a"
    },
    "deptName": "Mechanical Engineering",
    "deptId": "MEC",
    "__v": 0
  }
]

export const courses = [
  {
    "_id": {
      "$oid": "648cce9a6d423b154718df20"
    },
    "dept": {
      "$oid": "648cc0e9b6edc9fb04c08404"
    },
    "year": 2,
    "sem": 4,
    "courseCode": "22CS3PCADA",
    "courseName": "Analysis of design and algorithms",
    "courseShortName": "ADA"
  },
  {
    "_id": {
      "$oid": "648cce9a6d423b154718df22"
    },
    "dept": {
      "$oid": "648cc10d476123d67be2094a"
    },
    "year": 2,
    "sem": 4,
    "courseCode": "22CS3PCDBM",
    "courseName": "Database management",
    "courseShortName": "ADA"
  },
]

export const students = [
  {
    "_id": {
      "$oid": "648a1770b199fc6d49e85e33"
    },
    "firstname": "Akram",
    "lastname": "Shafeek",
    "usn": "1BM21CS013",
    "email": "akram.cs21@bmsce.ac.in",
    "dept": "CSE",
    "year": 2,
    "sem": 4,
    "section": "A",
    "phone": [
      "8095825227",
      "9886465074"
    ],
    "avatar": "https://images.hindustantimes.com/img/2022/01/20/550x309/Robert_Pattinson_1642681700840_1642681719067.jpg",
    "__v": 0
  },
  {
    "_id": {
      "$oid": "648a1770b199fc6d49e85e33"
    },
    "firstname": "Haaid",
    "lastname": "Qazi",
    "usn": "1BM21CS070",
    "email": "haaid.cs21@bmsce.ac.in",
    "dept": "CSE",
    "year": 2,
    "sem": 4,
    "section": "B",
    "phone": [
      "8095825227",
      "9886465074"
    ],
    "avatar": "https://parimatchnews.com/wp-content/uploads/2021/01/Screenshot_1-634x640.png",
    "__v": 0
  },
  {
    "_id": {
      "$oid": "648a1770b199fc6d49e85e33"
    },
    "firstname": "Aisha",
    "lastname": "Chesti",
    "usn": "1BM21CS0010",
    "email": "aisha.cs21@bmsce.ac.in",
    "dept": "CSE",
    "year": 2,
    "sem": 4,
    "section": "A",
    "phone": [
      "8095825227",
      "9886465074"
    ],
    "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTySvlsIgOJAtfh9vXZyRdVxPoMeef3lnjfQHDNz8tMgg&usqp=CAU&ec=48665701",
    "__v": 0
  }
]