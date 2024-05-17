import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { AuthService } from "../services/AuthService";
import { saveUserInfo } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { Routes } from "../routes/CONSTANTS";

const useUserInfo = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const username = useAppSelector((state) => state.user.username);
    const firstName = useAppSelector((state) => state.user.firstName);
    const lastName = useAppSelector((state) => state.user.lastName);
    const getUserInfo = () => {
        AuthService.getUserInfo().then((response) => {
            dispatch(saveUserInfo(response))
        });
    }
    useEffect(() => {
        if (username === '') {
            getUserInfo();
        }
    }, [username])

    return {
        username,
        firstName,
        lastName,
        getUserInfo
    }
}
export default useUserInfo;