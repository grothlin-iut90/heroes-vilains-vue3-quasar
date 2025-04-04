import { defineStore } from "pinia";
import {
  createOrganisation,
  getAllOrganisationNames,
  getOrganisationByID,
  addTeam,
  removeTeam,
} from "@/services/org.service";
import {
  getAliases,
  getHeroByID,
  createHero,
  updateHero,
} from "@/services/hero.service";
import {
  getAllTeams,
  createTeam,
  addHeroes,
  removeHeroes,
} from "@/services/team.service";

export const useGeneralStore = defineStore("general", {
  state: () => ({
    HeroAliases: [],
    CurrentHero: null,
    Teams: [],
    CurrentTeam: null,
    OrganisationNames: [],
    CurrentOrganisation: null,
    OrganisationPassword: "",
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
  actions: {
    setOrganisationPassword(password) {
      this.OrganisationPassword = password;
    },
    async getHeroAliases() {
      console.log("STORE: Get all hero aliases");
      try {
        let result = await getAliases();
        if (result.error === 0) {
          this.HeroAliases = result.data;
        } else {
          console.log(result.data);
        }
      } catch (err) {
        console.log("Cas anormal dans getHeroAliases()");
      }
    },
    async getHero(heroId) {
      console.log("STORE: Get hero by id");
      try {
        let result = await getHeroByID(heroId);
        if (result.error === 0) {
          this.CurrentHero = result.data;
        } else {
          console.log(result.data);
        }
      } catch (err) {
        console.log("Cas anormal dans getHero() : " + err);
      }
    },
    async getTeams() {
      console.log("STORE: Get all teams");
      try {
        let result = await getAllTeams();
        if (result.error === 0) {
          this.Teams = result.data;
        } else {
          console.log(result.data);
        }
      } catch (err) {
        console.log("Cas anormal dans getTeams()");
      }
    },
    async getOrganisations() {
      console.log("STORE: Get all organisation names");
      try {
        let result = await getAllOrganisationNames();
        if (result.error === 0) {
          this.OrganisationNames = result.data;
        } else {
          console.log(result.data);
        }
      } catch (err) {
        console.log("Cas anormal dans getOrganisations()");
      }
    },
    async getOrganisation(data) {
      console.log("STORE: Get organisation by id");
      try {
        let result = await getOrganisationByID(data.id, data.secret);
        if (result.error === 0) {
          this.CurrentOrganisation = result.data[0];
        } else {
          console.log(result.data);
        }
      } catch (err) {
        console.log("Cas anormal dans getOrganisation()");
      }
    },
    async newOrganisation(data) {
      console.log("STORE: Create new organisation");
      let name = data.name;
      let secret = data.password;
      try {
        let result = await createOrganisation(name, secret);
        if (result.error === 0) {
          this.OrganisationNames.push(result.data);
        } else {
          console.log(result.data);
        }
      } catch (err) {
        console.log("Cas anormal dans newOrganisation()");
      }
    },
    async addTeamToOrganisation(data) {
      console.log("STORE: Add new team");
      let idTeam = data.idTeam;
      let name = data.nameTeam;
      try {
        let result = await addTeam(idTeam, this.OrganisationPassword);
        if (result.error === 0) {
          let team = result.data.teams.find((t) => t._id === idTeam);
          team.name = name;
          this.CurrentOrganisation.teams.push(team);
        } else {
          console.log(result.data);
        }
      } catch (err) {
        console.log("Cas anormal dans addTeamToOrganisation(): " + err);
      }
    },
    async removeTeamFromOrganisation(data) {
      console.log("STORE: Remove team");
      let idTeam = data.idTeam;
      try {
        let result = await removeTeam(idTeam, this.OrganisationPassword);
        if (result.error === 0) {
          this.CurrentOrganisation = result.data;
        } else {
          console.log(result.data);
        }
      } catch (err) {
        console.log("Cas anormal dans removeTeamFromOrganisation(): " + err);
      }
    },
    async setCurrentTeam(team) {
      console.log("Original team members:", team.members);
      let current = JSON.parse(JSON.stringify(team));
      try {
        for (let i = 0; i < team.members.length; i++) {
          let heroId = team.members[i];
          console.log(`Fetching hero with ID: ${heroId}`);
          let result = await getHeroByID(heroId);
          if (result.error === 0) {
            const hero = result.data[0];
            console.log(`Fetched hero data for ID ${heroId}:`, hero);
            current.members[i] = hero;
          } else {
            console.log(`Error fetching hero with ID ${heroId}:`, result.data);
          }
        }
        console.log("Updated team members with hero data:", current.members);
        this.CurrentTeam = current;
      } catch (err) {
        console.log("Error in setCurrentTeam:", err);
      }
    },
    async createTeam(data) {
      console.log("STORE: Create new team");
      let name = data.name;
      try {
        let result = await createTeam(name);
        if (result.error === 0) {
          this.Teams.push(result.data);
        } else {
          console.log(result.data);
        }
      } catch (err) {
        console.log("Cas anormal dans createTeam()");
      }
    },
    async addHeroesToTeam(data) {
      console.log("STORE: Add heroes to team");
      let idTeam = data.idTeam;
      let heroes = data.heroes;
      try {
        let result = await addHeroes(idTeam, heroes);
        if (result.error === 0) {
          await this.setCurrentTeam(result.data);
        } else {
          console.log(result.data);
        }
      } catch (err) {
        console.log("Cas anormal dans addHeroesToTeam()");
      }
    },
    async removeHeroesFromTeam(data) {
      console.log("STORE: Remove heroes from team");
      let idTeam = data.idTeam;
      let heroes = data.heroes;
      try {
        let result = await removeHeroes(idTeam, heroes);
        if (result.error === 0) {
          await this.setCurrentTeam(result.data);
        } else {
          console.log(result.data);
        }
      } catch (err) {
        console.log("Cas anormal dans removeHeroesFromTeam()");
      }
    },
    async createHero(hero) {
      try {
        let result = await createHero(hero);
        if (result.error === 0) {
          await this.getHeroAliases();
          return result.data;
        } else {
          console.log(result.data);
        }
      } catch (err) {
        console.log("Cas anormal dans createHero()");
      }
    },
    async updateHero(hero) {
      try {
        let result = await updateHero(hero, this.OrganisationPassword);
        if (result.error === 0) {
          if (this.CurrentTeam) {
            await this.setCurrentTeam(
              this.CurrentOrganisation.teams.find(
                (t) => t._id === this.CurrentTeam._id
              )
            );
          }
          await this.getHeroAliases();
        } else {
          console.log(result.data);
        }
      } catch (err) {
        console.log("Cas anormal dans updateHero()", err);
      }
    },
  },
});