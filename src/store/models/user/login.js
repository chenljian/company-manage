import { getLoginUser } from "@/utils/api";

const login = {
    namespaced: true,
    state: {
        login: {},
        loginUser: {},
        loading: false
    },
    mutations: {
        CHANGE_LOGIN: (state, res) => {
            state.login = res;
            state.loginUser = res;
        },
        CLEAR_LOGIN: state => {
            state.login = {};
        },
        CHANGE_LOADING: (state, loading) => {
            state.loading = loading;
        }
    },
    actions: {
        login({ commit }, { params }) {
            commit("CHANGE_LOADING", true);
            getLoginUser(params).then((res)=>{
                console.log("登录返回值", res);
                if (res && res.success) {
                    commit('CHANGE_LOGIN', {
                        ...res.object,
                        type: "account",
                        status: "ok"
                    });
                    params.callback(res.object);
                } else {
                    commit("CHANGE_LOGIN", {
                        type: "account",
                        status: "error"
                    });
                }
                commit("CHANGE_LOADING", false);
            });

            // setTimeout(() => {
            //     if (params.type == "account") {
            //         if (
            //             (params.userName == "admin" &&
            //                 params.password == "888888") ||
            //             (params.userName == "user" &&
            //                 params.password == "123456")
            //         ) {
            //             commit("CHANGE_LOGIN", {
            //                 type: "account",
            //                 status: "ok"
            //             });
            //             params.callback();
            //         } else {
            //             commit("CHANGE_LOGIN", {
            //                 type: "account",
            //                 status: "error"
            //             });
            //         }
            //     } else {
            //         commit("CHANGE_LOGIN", {
            //             type: "mobile",
            //             status: "error"
            //         });
            //     }
            //
            // }, 800);
        },
        clearLogin({ commit }) {
            commit("CHANGE_LOGIN");
        }
    }
};

export default login;
