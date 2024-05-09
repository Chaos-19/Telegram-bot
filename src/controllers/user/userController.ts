import { supabase } from "../../config/connetDB";

export const createUser = async (data: {
    telegram_id: number;
    first_name: string;
}) => {

    try {
        const { data: foundUser, error: error1 } = await supabase
            .from("users")
            .select()
            .eq("telegram_id", data?.telegram_id);

        if (foundUser?.length as number <= 0) {
            const { error } = await supabase
                .from("users")
                .insert([data]);

            if (error) {
                console.log(error);
            }

        } else {
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