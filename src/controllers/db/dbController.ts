import { error } from "console";
import { supabase } from "../../config/connetDB";

type Job = {
    title: string;
    skillrequirements: string;
    jobType: string;
    experienceLevel: string;
    description: string;
    location: string;
    deadline: string;
    sector: string;
    company: string
}

export const insertData = async (data: Job[]) => {
    try {
        data.forEach(async (job) => {

            const { data: foundJob, error: error1 } = await supabase
                .from('job-tg-bot')
                .select()
                .eq('title', job?.title)

            console.log(foundJob);


            if (foundJob?.length == 0) {
                const { error } = await supabase
                    .from('job-tg-bot')
                    .insert([{
                        ...job,

                    }])
                if (error) {
                    console.log(error);
                }
            } else {
                console.log("Data already exists", foundJob);
            }
        })

        console.log("Data inserted successfully");

    } catch (e) {
        console.log(e);
    }

}