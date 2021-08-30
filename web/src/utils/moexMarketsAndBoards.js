export const markets = [
    {name: "Рынок акций", value: "shares"},
    {name: "Рынок облигаций", value: "bonds"},
    {name: "Иностранные ц.б.", value: "foreignshares"}
];

export const boards = {
    shares: [{ name: "TQBR", value: "tqbr" }, { name: "TQTF", value: "tqtf" }, { name: "TQTE", value: "tqte" },
            { name: "TQTD", value: "tqtd" }, { name: "TQPI", value: "tqpi" }, { name: "SMAL", value: "smal" },
            { name: "TQIF*", value: "tqif" }, { name: "TQFE*", value: "tqfe" }, { name: "TQFD*", value: "tqfd" }],
            
    bonds: [{ name: "TQOB", value: "tqob" }, { name: "TQCB", value: "tqcb" }, { name: "TQRD", value: "tqrd" },
            { name: "TQIR", value: "tqir" }, { name: "TQOD", value: "tqod" }, { name: "TQOE", value: "tqoe" }],
            
    foreignshares: [{ name: "FQBR", value: "fqbr" }]
};