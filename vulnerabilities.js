/**
 * This file contains intentional vulnerabilities and code smells
 * for testing SonarQube detection capabilities
 */

// VULNERABILITY 1: Dead code - unreachable code
function deadCodeExample() {
    let x = 5;
    return x + 10;
    x = 20; // Dead code - never executed
    console.log(x);
}

// VULNERABILITY 2: Unused variables
function unusedVariablesExample() {
    let unusedVar1 = "I am never used";
    let unusedVar2 = 42;
    let usedVar = "I am used";
    console.log(usedVar);
    return usedVar;
}

// VULNERABILITY 3: Deeply nested conditions - high complexity
function complexNestedConditions(a, b, c, d, e) {
    if (a > 0) {
        if (b < 10) {
            if (c === "test") {
                if (d !== null) {
                    if (e === true) {
                        if (a + b > 5) {
                            if (d.length > 0) {
                                if (c.includes("e")) {
                                    if (e && b < 5) {
                                        if (a > b && c.length > 3) {
                                            console.log("This is deeply nested!");
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return false;
}

// VULNERABILITY 4: Magic numbers - no constants
function processGameScore(score) {
    if (score > 100) {
        return score * 2.5 + 150;
    } else if (score > 50) {
        return score * 1.75 + 75;
    } else if (score > 20) {
        return score * 1.25 + 25;
    }
    return score + 10;
}

// VULNERABILITY 5: Long parameter list
function gameDataProcessor(playerName, playerScore, playerLevel, playerHealth, 
                          playerMana, playerExperience, playerCoins, playerItems, 
                          playerAchievements, playerFriends, playerInventorySize) {
    let data = {
        name: playerName,
        score: playerScore,
        level: playerLevel,
        health: playerHealth,
        mana: playerMana,
        exp: playerExperience,
        coins: playerCoins,
        items: playerItems,
        achievements: playerAchievements,
        friends: playerFriends,
        invSize: playerInventorySize
    };
    return data;
}

// VULNERABILITY 6: Function too long with multiple responsibilities
function megaFunction(input, mode) {
    let result = [];
    let counter = 0;
    let tempArray = [];
    
    for (let i = 0; i < input.length; i++) {
        if (input[i] > 0) {
            tempArray.push(input[i]);
            counter++;
        }
    }
    
    for (let i = 0; i < tempArray.length; i++) {
        for (let j = i + 1; j < tempArray.length; j++) {
            if (tempArray[i] > tempArray[j]) {
                let temp = tempArray[i];
                tempArray[i] = tempArray[j];
                tempArray[j] = temp;
            }
        }
    }
    
    if (mode === 1) {
        for (let i = 0; i < tempArray.length; i++) {
            result.push(tempArray[i] * 2);
        }
    } else if (mode === 2) {
        for (let i = 0; i < tempArray.length; i++) {
            result.push(tempArray[i] + 10);
        }
    } else if (mode === 3) {
        for (let i = 0; i < tempArray.length; i++) {
            result.push(Math.sqrt(tempArray[i]));
        }
    }
    
    let sum = 0;
    for (let i = 0; i < result.length; i++) {
        sum += result[i];
    }
    
    let average = sum / result.length;
    console.log("Sum: " + sum + ", Average: " + average);
    
    return result;
}

// VULNERABILITY 7: Duplicate code
function calculateBonus1(score, level) {
    if (score > 100 && level > 5) {
        let bonus = score * 0.1;
        bonus = bonus + (level * 2);
        return bonus;
    }
    return 0;
}

function calculateBonus2(score, level) {
    if (score > 100 && level > 5) {
        let bonus = score * 0.1;
        bonus = bonus + (level * 2);
        return bonus;
    }
    return 0;
}

function calculateBonus3(score, level) {
    if (score > 100 && level > 5) {
        let bonus = score * 0.1;
        bonus = bonus + (level * 2);
        return bonus;
    }
    return 0;
}

// VULNERABILITY 8: Lack of error handling
function parseUserData(jsonString) {
    let data = JSON.parse(jsonString);
    return data.user.profile.settings.notifications.email;
}

// VULNERABILITY 9: Inconsistent naming conventions
function gameLogic() {
    let _unusualVar = 5;
    let normalVar = 10;
    let MixedCaseVar = 15;
    let ALLCAPSVAR = 20;
    return _unusualVar + normalVar + MixedCaseVar + ALLCAPSVAR;
}

// VULNERABILITY 10: Complex conditional in return statement
function getPlayerStatus(health, mana, stamina, level, exp, gold) {
    return health > 0 && mana > 0 && stamina > 0 ? 
        level > 10 && exp > 1000 ? 
            gold > 5000 ? "wealthy_hero" : "experienced_hero" 
        : "novice_hero" 
    : "dead";
}

// VULNERABILITY 11: Non-descriptive variable names
function calc(a, b, c, d) {
    let x = a + b;
    let y = c - d;
    let z = x * y;
    let w = z / (b + d);
    return w;
}

// VULNERABILITY 12: Multiple exit points from function
function searchPlayer(players, targetId) {
    for (let i = 0; i < players.length; i++) {
        if (players[i].id === targetId) {
            return players[i]; // Exit point 1
        }
    }
    return null; // Exit point 2
}

function searchPlayerComplex(players, targetId, filterActive) {
    if (!players) {
        return null; // Exit point 1
    }
    
    if (filterActive) {
        for (let i = 0; i < players.length; i++) {
            if (players[i].id === targetId && players[i].active) {
                return players[i]; // Exit point 2
            }
        }
    } else {
        for (let i = 0; i < players.length; i++) {
            if (players[i].id === targetId) {
                return players[i]; // Exit point 3
            }
        }
    }
    return undefined; // Exit point 4
}

// VULNERABILITY 13: Boolean return instead of conditional
function isGameOver(health, lives, gameTime) {
    if (health <= 0) {
        return true;
    }
    if (lives <= 0) {
        return true;
    }
    if (gameTime >= 3600) {
        return true;
    }
    return false;
}

// VULNERABILITY 14: Synchronous operations that could be async
function loadGameConfig(filename) {
    // This is blocking - should be async
    let data = require('fs').readFileSync(filename, 'utf8');
    return JSON.parse(data);
}

// VULNERABILITY 15: Cyclomatic complexity - too many branches
function complexRating(score, level, achievements, items, skills, quests, reputation) {
    let rating = 0;
    
    if (score > 1000) rating += 10;
    if (level > 50) rating += 20;
    if (achievements > 25) rating += 15;
    if (items > 100) rating += 5;
    if (skills > 10) rating += 25;
    if (quests > 50) rating += 30;
    if (reputation > 5000) rating += 35;
    
    if (score > 1000 && level > 50) rating += 5;
    if (achievements > 25 && items > 100) rating += 10;
    if (skills > 10 && quests > 50) rating += 15;
    if (reputation > 5000 && score > 1000) rating += 20;
    
    if (score > 1000 && level > 50 && achievements > 25) rating += 25;
    if (items > 100 && skills > 10 && quests > 50) rating += 30;
    
    return rating;
}

// VULNERABILITY 16: Array index out of bounds potential
function getPlayerWeapon(player) {
    return player.inventory[0]; // Could be undefined
}

// VULNERABILITY 17: Comparison using == instead of ===
function checkGameMode(mode) {
    if (mode == "multiplayer") { // Should use ===
        return true;
    }
    if (mode == 1) { // Loose comparison
        return false;
    }
    return null;
}

// VULNERABILITY 18: Global variable usage
let globalGameState = {};
let globalPlayerList = [];
let globalScoreBoard = {};

function updateGlobalState(newState) {
    globalGameState = newState;
    globalPlayerList.push(newState.player);
    globalScoreBoard[newState.player.id] = newState.player.score;
}

// VULNERABILITY 19: Reassignment of function parameters
function calculateFinalScore(baseScore, multiplier) {
    baseScore = baseScore * 2; // Parameter reassignment - avoid this
    multiplier = multiplier + 5; // Parameter reassignment
    return baseScore * multiplier;
}

// VULNERABILITY 20: Missing default case in switch
function getGameDifficulty(level) {
    let difficulty;
    switch(level) {
        case 1:
            difficulty = "Easy";
            break;
        case 2:
            difficulty = "Medium";
            break;
        case 3:
            difficulty = "Hard";
            break;
        // Missing default case
    }
    return difficulty;
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        deadCodeExample,
        unusedVariablesExample,
        complexNestedConditions,
        processGameScore,
        gameDataProcessor,
        megaFunction,
        calculateBonus1,
        calculateBonus2,
        calculateBonus3,
        parseUserData,
        gameLogic,
        getPlayerStatus,
        calc,
        searchPlayer,
        searchPlayerComplex,
        isGameOver,
        loadGameConfig,
        complexRating,
        getPlayerWeapon,
        checkGameMode,
        updateGlobalState,
        calculateFinalScore,
        getGameDifficulty
    };
}
