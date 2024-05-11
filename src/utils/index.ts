import { text } from "stream/consumers";

export const menu: {
    text: string;

    callback_data: string;

    isSelected: boolean
}[] = [
        {
            text: "Software design and Development",
            callback_data: "opt-0",
            isSelected: false,
        },
        {
            text: "Media and communication",
            callback_data: "opt-1",
            isSelected: false
        },
        {
            text: "Food and Drink preparation or service",
            callback_data: "opt-2",
            isSelected: false,
        },
        {
            text: "Information technology",
            callback_data: "opt-3",
            isSelected: false
        },
        {
            text: "Accounting and finance",
            callback_data: "opt-4",
            isSelected: false
        },
        {
            text: "Creative art and design",
            callback_data: "opt-5",
            isSelected: false
        },
        {
            text: "Architecture and urban planning",
            callback_data: "opt-6",
            isSelected: false,
        },
        {
            text: "Construction and Civil engineering",
            callback_data: "opt-7",
            isSelected: false,
        },
        {
            text: "Health care",
            callback_data: "opt-8",
            isSelected: false
        },
        {
            text: "Hospitality and Tourism",
            callback_data: "opt-9",
            isSelected: false
        },
        {
            text: "Translation and Transcription",
            callback_data: "opt-10",
            isSelected: false,
        },
        {
            text: "Manufacturing and production",
            callback_data: "opt-11",
            isSelected: false,
        },
        {
            text: "Logistic and Supply chain",
            callback_data: "opt-12",
            isSelected: false
        },
        {
            text: "Installation and Maintenance technician",
            callback_data: "opt-13",
            isSelected: false,
        },
        {
            text: "Sales and Promotion",
            callback_data: "opt-14",
            isSelected: false
        },
        {
            text: "Purchasing and procurement",
            callback_data: "opt-15",
            isSelected: false,
        },
        {
            text: "Secretarial and office management",
            callback_data: "opt-16",
            isSelected: false,
        },
        {
            text: "Security and Safety",
            callback_data: "opt-17",
            isSelected: false
        },
        {
            text: "Multimedia content production",
            callback_data: "opt-18",
            isSelected: false,
        },
        {
            text: "Horticulture",
            callback_data: "opt-19",
            isSelected: false
        },
        {
            text: "Agriculture",
            callback_data: "opt-20",
            isSelected: false
        },
        {
            text: "Livestock and animal husbandry",
            callback_data: "opt-21",
            isSelected: false,
        },
        {
            text: "Aeronautics and Aerospace",
            callback_data: "opt-22",
            isSelected: false
        },
        {
            text: "Entertainment",
            callback_data: "opt-23",
            isSelected: false
        },
        {
            text: "Fashion design",
            callback_data: "opt-24",
            isSelected: false
        },
        {
            text: "Clothing and Textile",
            callback_data: "opt-25",
            isSelected: false
        },
        {
            text: "Project management and administration",
            callback_data: "opt-26",
            isSelected: false,
        },
        {
            text: "Business and Commerce",
            callback_data: "opt-27",
            isSelected: false
        },
        {
            text: "Human resource and talent management",
            callback_data: "opt-28",
            isSelected: false,
        },
        {
            text: "Mechanical and Electrical engineering",
            callback_data: "opt-29",
            isSelected: false,
        },
        {
            text: "Chemical and Biomedical engineering",
            callback_data: "opt-30",
            isSelected: false,
        },
        {
            text: "Environmental and Energy engineering",
            callback_data: "opt-31",
            isSelected: false,
        },
        {
            text: "Research and data Analytics",
            callback_data: "opt-32",
            isSelected: false,
        },
        {
            text: "Psychiatry, Psychology and Social work",
            callback_data: "opt-33",
            isSelected: false,
        },
        {
            text: "Law",
            callback_data: "opt-34",
            isSelected: false
        },
        {
            text: "Beauty and Grooming",
            callback_data: "opt-35",
            isSelected: false
        },
        {
            text: "Labor work and Masonry",
            callback_data: "opt-36",
            isSelected: false
        },
        {
            text: "Teaching and Tutor",
            callback_data: "opt-37",
            isSelected: false
        },
        {
            text: "Training and Mentorship",
            callback_data: "opt-38",
            isSelected: false
        },
        {
            text: "Pharmaceutical",
            callback_data: "opt-39",
            isSelected: false
        },
        {
            text: "Customer service and care",
            callback_data: "opt-40",
            isSelected: false
        },
        {
            text: "Event management and Organization",
            callback_data: "opt-41",
            isSelected: false,
        },
        {
            text: "Transportation and Delivery",
            callback_data: "opt-42",
            isSelected: false,
        },
        {
            text: "Woodwork and Carpentry",
            callback_data: "opt-43",
            isSelected: false
        },
        {
            text: "Marketing and Advertisement",
            callback_data: "opt-44",
            isSelected: false,
        },
        {
            text: "Shop and Office attendant",
            callback_data: "opt-45",
            isSelected: false
        },
        {
            text: "Broker and Case closer",
            callback_data: "opt-46",
            isSelected: false
        },
        {
            text: "Advisory and Consultancy",
            callback_data: "opt-47",
            isSelected: false
        },
        {
            text: "Janitorial and other Office services",
            callback_data: "opt-48",
            isSelected: false,
        },
        {
            text: "Documentation and Writing services",
            callback_data: "opt-49",
            isSelected: false,
        },
        {
            text: "Veterinary",
            callback_data: "opt-50",
            isSelected: false
        },
        {
            text: "Data mining and analytics",
            callback_data: "opt-51",
            isSelected: false
        },
        {
            text: "Gardening and landscaping",
            callback_data: "opt-52",
            isSelected: false
        },
        {
            text: "Transportation",
            callback_data: "opt-53",
            isSelected: false
        },
    ];

export const mainMenu = [
    {
        text: "job notification",
        callback_data: "notification"
    },
    {
        text: "job search",
        callback_data: "search"
    },
    {
        text: "Settings",
        callback_data: "setting"
    },

    {
        text: "help",
        callback_data: "help"
    }
]

export const jobType = [
    {
        text: "FULL_TIME",
        callback_data: "type-1",
        isSelected:false
    },
    {
        text: "PART_TIME",
        callback_data: "type-2",
        isSelected:false
    },
    {
        text: "PAID INTERN",
        callback_data: "type-3",
        isSelected:false
    },
    {
        text: "UNPAID_INTERN",
        callback_data: "type-4",
        isSelected:false
    }
]