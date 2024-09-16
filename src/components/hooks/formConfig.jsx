export const formConfig = [
    {
      id: 1,
      title: "Localized Registration Form for NU MOA Participants",
      description: "This registration is controlled by NU MOA COMEX. Please complete the form below.",
      questions: [
        {
          id: "q1",
          questionText: "This registration is controlled by NU MOA COMEX...",
          type: "radio",
          options: ["I understand"]
        }
      ]
    },
    {
      id: 2,
      title: "Data Privacy",
      description: "By answering this form, you are allowing NU MOA COMEX to safekeep your data...",
      questions: [
        {
          id: "q2",
          questionText: "By answering this form, you allow NU MOA COMEX...",
          type: "radio",
          options: ["I agree", "Exit the form"]
        },
        {
          id: "q3",
          questionText: "Do you permit NU MOA COMEX to use these materials...",
          type: "radio",
          options: ["Yes", "No"]
        }
      ]
    },
    {
      id: 3,
      title: "Safety Declaration",
      description: "By continuing answering this form, you acknowledge that this event is voluntary...",
      questions: [
        {
          id: "q4",
          questionText: "By continuing answering this form, you acknowledge...",
          type: "radio",
          options: ["I agree", "Exit the form"]
        },
        {
          id: "q5",
          questionText: "I am declaring that I am physically fit to take part in this event...",
          type: "radio",
          options: ["I agree", "Exit the form"]
        }
      ]
    }
  ];