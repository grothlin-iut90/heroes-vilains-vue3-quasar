import {
    createOrganisation,
    getAllOrganisationNames,
    getOrganisationByID,
    addTeam,
    removeTeam,
} from "@/services/org.service";
import { getAliases, getHeroByID, createHero, updateHero } from "@/services/hero.service";
import { getAllTeams, createTeam, addHeroes, removeHeroes } from "@/services/team.service";

export default {
    namespaced: true,
    state: () => ({
        HeroAliases: [],
        CurrentHero: null,
        Teams: [],
        CurrentTeam: null,
        OrganisationNames: [],
        CurrentOrganisation: null,
        HeroPowerTypes: [
            "force",
            "vitesse",
            "endurance",
            "magie",
            "effrayant",
            "furtivité",
            "stupidité",
        ],
    }),
    mutations: {
        setHeroAliases(state, aliases) {
            state.HeroAliases = aliases;
        },
        setCurrentHero(state, hero) {
            state.CurrentHero = hero;
        },
        setTeams(state, teams) {
            state.Teams = teams;
        },
        setCurrentTeam(state, team) {
            state.CurrentTeam = team;
        },
        setOrganisationNames(state, names) {
            state.OrganisationNames = names;
        },
        setCurrentOrganisation(state, org) {
            state.CurrentOrganisation = org;
        },
    },
    actions: {
        async getHeroAliases({ commit }) {
            try {
                const result = await getAliases();
                if (result.error === 0) {
                    commit("setHeroAliases", result.data);
                } else {
                    console.log(result.data);
                }
            } catch (err) {
                console.log("Error in getHeroAliases:", err);
            }
        },
        async getHero({ state }, heroId) {
            try {
                const result = await getHeroByID(heroId);
                if (result.error === 0) {
                    state.CurrentHero = result.data;
                } else {
                    console.log(result.data);
                }
            } catch (err) {
                console.log("Error in getHero:", err);
            }
        },
        async getTeams({ commit }) {
            try {
                const result = await getAllTeams();
                if (result.error === 0) {
                    commit("setTeams", result.data);
                } else {
                    console.log(result.data);
                }
            } catch (err) {
                console.log("Error in getTeams:", err);
            }
        },
        async getOrganisations({ commit }) {
            try {
                const result = await getAllOrganisationNames();
                if (result.error === 0) {
                    commit("setOrganisationNames", result.data);
                } else {
                    console.log(result.data);
                }
            } catch (err) {
                console.log("Error in getOrganisations:", err);
            }
        },
        async getOrganisation({ commit }, data) {
            try {
                const result = await getOrganisationByID(data.id, data.secret);
                if (result.error === 0) {
                    commit("setCurrentOrganisation", result.data[0]);
                } else {
                    console.log(result.data);
                }
            } catch (err) {
                console.log("Error in getOrganisation:", err);
            }
        },
        async createTeam({ commit, state }, data) {
            try {
                const result = await createTeam(data.name);
                if (result.error === 0) {
                    const teams = [...state.Teams, result.data];
                    commit("setTeams", teams);
                } else {
                    console.log(result.data);
                }
            } catch (err) {
                console.log("Error in createTeam:", err);
            }
        },
    },
};