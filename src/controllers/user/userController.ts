import { promises } from "dns";
import { supabase } from "../../config/connetDB";

export const createUser = async (data: {
    telegram_id: number;
    first_name: string;
    job_list: string[]
    jobType: string[]
}) => {

    try {
        const { data: foundUser, error: error1 } = await supabase
            .from("users")
            .select()
            .eq("telegram_id", data?.telegram_id);

        if (!foundUser || foundUser?.length as number < 1) {
            const { error } = await supabase
                .from("users")
                .insert([{
                    first_name: data?.first_name,
                    telegram_id: data?.telegram_id,
                    notify_job_list: data?.job_list,
                    job_type: data?.jobType
                }]);

            if (!error) {

                Promise.all(data?.job_list.map(async (job) => {

                    const { data: existJob } = await supabase
                        .from("scraperTitleList").
                        select()
                        .eq("inputValu", job)

                    if (!existJob || existJob?.length as number < 1) {

                        const { error } = await supabase
                            .from("scraperTitleList")
                            .insert([{
                                inputValu: job
                            }])
                    } else {

                        console.log("Job already exists");
                    }

                }))

            }
        } else {
            console.log([foundUser]);

            console.log("User already exists");
        }
    } catch (e) {
        console.log(e);
    }
};

export const isUserExist = async (telegram_id: number) => {
    try {
        const { data: foundUser, error: error1 } = await supabase
            .from("users")
            .select()
            .eq("telegram_id", telegram_id);
        if (foundUser?.length as number <= 0) {
            return false;
        } else {
            return true;
        }
    } catch (e) {
        console.log(e);
    }
}

export const updateUser = async (
    telegram_id: number,
    job_list: string[]
) => {
    try {
        const { data: foundUser, error: error1 } = await supabase
            .from("users")
            .select()
            .eq("telegram_id", telegram_id);

        if (foundUser?.length as number > 0) {
            const { error } = await supabase.
                from("users")
                .update({ notify_job_list: job_list })
                .eq("telegram_id", telegram_id);

            console.log("Data updated successfully");

        }
    } catch (e) {
        console.log(e);
    }
}