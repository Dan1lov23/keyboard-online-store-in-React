import brandsImgs from "../imgs/brandsImgs.ts";

const brandsLogoModule = (brand:string) => {
    for (let a = 0; a < brandsImgs.length; a++) {
        if (brandsImgs[a].brand === brand) {
            return brandsImgs[a].logo;
        }
    }
}

export default brandsLogoModule;

