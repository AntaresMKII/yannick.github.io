/* ===================================================
 * Map.js
 * ===================================================
 * Author: Byte Me 2.0 Team
 * Date: 03/11/2019
 * Description:
 * This file contains all the functionality for the in game map
 */

var portals = [14, 17, 17, 12, 13, 18, 24, 19, 14, 12, 6, 2, 1, 19, 22, 19, 1, 16, 19, 15, 8, 0, 13, 2]; //enter the values for the portals two for each portal in order of load (depending on the number of col and row)
var counter = 0; //leave it as it is
var nHelp = 5;

class Map{
	constructor(mapid){
		let temp = Map_data[mapid];
		this.id = temp["id")];
		this.name = temp["name"];
		this.tileset = temp["tileset"];
		this.collision = temp["collision-map"];
		this.background = document.createElement("img");
		this.background.src = temp["background"];
		this.parallax = document.createElement("img");
		this.parallax.src = temp["parallax"];
		this.events = temp["events"];
	}
}

Array.prototype.display = function(){
    for(i = 0; i < this.length; i++)
        for(j = 0; j < this[i].length; j++)
            this[i][j].show();
}

Array.prototype.collisionCheck = function(player){
    let result = false;
    for(i = 0; i < this.length; i++)
        for(j = 0; j < this[i].length; j++)
						result = result || this[i][j].isColliding(player, this[i][j].collision);
    return result;
}

Map.prototype.loadMap = function(){
	temp = this.collision;
	this.collision = new Array(temp.length);
	this.collision = twoDArray(this.collision, temp[0].length);
    for(i = 0; i < temp.length; i++)
		for(j = 0; j < this.collision[i].length; j++)
		if(temp[i][j] == 2){
			this.collision[i][j] = new Portal(32 * j, 32 * i, 32 * portals[counter] + 1, 32 * portals[counter + 1] + 1);
			counter = counter + 2;
		}
		else if(temp[i][j] == 3){
			this.collision[i][j] = new Coin(32 * j, 32 * i);
		}
		else{
			this.collision[i][j] = new Tile(32 * j, 32 * i, temp[i][j]);
		}

}

function twoDArray(temp, x){ //generates a 2D array
    for(i = 0; i < temp.length; i++)
        temp[i] = new Array(x);
    return temp;
}

function findNearestHelp(){
	let dis = new Array(nHelp);
	let counter = 0;
	let min;
	let index;
	for(i = 0; i < tileMap.length; i++)
		for(j = 0; j < tileMap[i].length; j++){
			if(currentMap == 1){
				if(map1[i][j] == 3){
					dis[counter] = tileMap[i][j].distance(player);
					counter++;
				}
			}
			else if(currentMap == 2){
				if(map2[i][j] == 3){
					dis[counter] = tileMap[i][j].distance(player);
					counter++;
				}
			}
			else if(currentMap == 3){
				if(map2[i][j] == 3){
					dis[counter] = tileMap[i][j].distance(player);
					counter++;
				}
			}
		}
	min = Math.min(dis[0], dis[1], dis[2], dis[3], dis[4]);
	for(n = 0; n < dis.length; n++){
		if(dis[n] == min)
			index = n;
	}
	counter = 0;
	for(i = 0; i < tileMap.length; i++)
		for(j = 0; j < tileMap[i].length; j++){
			if(currentMap == 1){
				if(map1[i][j] == 3 && counter != index){
					counter++;
				}
				else if(map1[i][j] == 3 && tileMap[i][j].isShowing){
					tileMap[i][j].searchForHelp();
					counter++
				}
				else if(map1[i][j] == 3 && !tileMap[i][j].isShowing){
					ctx.beginPath();
        	ctx.rect(0, 0, canvas.width, canvas.height);
        	ctx.fillStyle = "rgba(0, 0, 0)";
        	ctx.fill();
				}
			}
			else if(currentMap == 2){
				if(map2[i][j] == 3 && counter != index){
					counter++;
				}
				else if(map2[i][j] == 3 && tileMap[i][j].isShowing){
					tileMap[i][j].searchForHelp();
					counter++;
				}
				else if(map2[i][j] == 3 && !tileMap[i][j].isShowing){
					ctx.beginPath();
        	ctx.rect(0, 0, canvas.width, canvas.height);
        	ctx.fillStyle = "rgba(0, 0, 0)";
        	ctx.fill();
				}
			}
			else if(currentMap == 3){
				if(map3[i][j] == 3 && counter != index){
					counter++;
				}
				else if(map3[i][j] == 3 && tileMap[i][j].isShowing){
					tileMap[i][j].searchForHelp();
					counter++;
				}
				else if(map3[i][j] == 3 && !tileMap[i][j].isShowing){
					ctx.beginPath();
        	ctx.rect(0, 0, canvas.width, canvas.height);
        	ctx.fillStyle = "rgba(0, 0, 0)";
        	ctx.fill();
				}
			}
		}
}