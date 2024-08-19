import { Todo } from "./todo.js";
import { Project } from "./project.js";
import { format } from "date-fns";


export function populateWithExampleData() {
    const secondsInDay = 24 * 60 * 60 * 1000;

    const today = format(new Date(), 'yyyy-MM-dd');
    const tomorrow = format(new Date(new Date().getTime() + secondsInDay), 'yyyy-MM-dd');
    const afterTomorrow = format(new Date(new Date().getTime() + secondsInDay), 'yyyy-MM-dd');
    const weekLater = format(new Date(new Date().getTime() + 7 * secondsInDay), 'yyyy-MM-dd');
    const monthLater = format(new Date(new Date().getTime() + 30 * secondsInDay), 'yyyy-MM-dd');
    
    
    const schoolProject = new Project('School');
    const workProject = new Project('Work');
    const houseProject = new Project('Chores');
    const hobbyProject = new Project('Hobby');
    
    const feedCat = new Todo("Feed the cat", today, houseProject, "Give Bruno and Loki wet food in the evening.", 'high');
    const mathExam = new Todo("Learn for exam", weekLater, schoolProject, "", 'high');
    const groceries = new Todo("Do the grocery shopping", tomorrow, houseProject, "Need to buy bread, milk, eggs.", 'normal');
    const interview = new Todo("Job interview", afterTomorrow, workProject, "", 'high');
    const book = new Todo("Finish reading book", monthLater, hobbyProject, "", 'low');
    
}
