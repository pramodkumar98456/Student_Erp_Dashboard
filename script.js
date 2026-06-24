// Local Storage Registry Array Setup
let defaultRegistry = [
    { id: "STU1001", name: "Pramod Kumar", email: "pramodkumar12@gmail.com", course: "M.C.A Systems" },
    { id: "STU1002", name: "Pankaj", email: "pankaj@gmail.com", course: "B.Sc Data Science" }
];

// Initialize and pull data from browser memory cache
let students = JSON.parse(localStorage.getItem('erp_students')) || defaultRegistry;

// Core DOM Selector References
const studentTableBody = document.getElementById('student-table-body');
const totalStudentsCount = document.getElementById('total-students-count');
const studentModal = document.getElementById('student-modal');
const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const studentForm = document.getElementById('student-form');

// Application View Matrix Sync Operations
function renderDashboard() {
    studentTableBody.innerHTML = '';
    
    students.forEach((student) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${student.id}</strong></td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteStudentProfile('${student.id}')">
                    <i class="fa-solid fa-trash-can"></i> Delete
                </button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });

    // Refresh display telemetry modules
    totalStudentsCount.textContent = students.length;
    localStorage.setItem('erp_students', JSON.stringify(students));
}

// Modal Layer View Mutation Hooks
openModalBtn.addEventListener('click', () => studentModal.classList.add('active'));
closeModalBtn.addEventListener('click', () => {
    studentModal.classList.remove('active');
    studentForm.reset();
});

// Structural Append Ingestion Handler
studentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('student-name').value;
    const emailInput = document.getElementById('student-email').value;
    const courseInput = document.getElementById('student-course').value;
    
    // Auto-generate incrementing sequential Unique ID
    const nextIdNumber = students.length > 0 ? parseInt(students[students.length - 1].id.replace('STU', '')) + 1 : 1001;
    const computedId = `STU${nextIdNumber}`;

    const newStudent = {
        id: computedId,
        name: nameInput,
        email: emailInput,
        course: courseInput
    };

    students.push(newStudent);
    renderDashboard();
    
    // Auto-clear input structures and terminate overlay view
    studentModal.classList.remove('active');
    studentForm.reset();
});

// Context Target Destructuring Handler
window.deleteStudentProfile = function(studentId) {
    if(confirm("Are you sure you want to delete this student record?")) {
        students = students.filter(student => student.id !== studentId);
        renderDashboard();
    }
};

// Application Global Engine Core Boot Initialization Trigger
renderDashboard();
