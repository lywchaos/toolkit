import argparse
import numpy as np

from matplotlib import animation
from matplotlib import pyplot as plt
from scipy.signal import convolve2d # numpy only has conv1d

class GameOfLife:
    def __init__(
        self,
        height: int = 500,
        width: int = 500,
    ) -> None:
        # randomly initialize the field
        self.field = np.random.random((height, width))
        self.field = (self.field < 0.3) * np.ones((height, width)) # 1:alive

        # using matplotlib to visualize
        self.fig, self.ax = plt.subplots(1, 1)
    
    def field2gray(
        self,
    ):
        # black means alive
        data = (0 == self.field) * 255
        return data, {"cmap": "gray", "vmin": 0, "vmax": 255}
    
    def step(
        self,
    ) -> None:
        # apply the rule to evolve
        neighbor_mat = convolve2d(self.field, np.ones((3, 3)), mode="same") - self.field

        for i in range(len(self.field)):
            for j in range(len(self.field[i])):
                if neighbor_mat[i][j] <= 1 and self.field[i][j] == 1:
                    self.field[i][j] = 0
                elif neighbor_mat[i][j] == 2:
                    pass
                elif neighbor_mat[i][j] == 3:
                    if self.field[i][j] == 1:
                        pass
                    else:
                        self.field[i][j] = 1
                else:
                    if self.field[i][j] == 1:
                        self.field[i][j] = 0

def show(
    gol: GameOfLife,
) -> None:
    data, kwargs = gol.field2gray()
    im = gol.ax.imshow(data, **kwargs)

    def update(*args):
        gol.step()
        im.set_data(gol.field2gray()[0])
        return (im,)
    
    ani = animation.FuncAnimation(fig=gol.fig, func=update, interval=60, blit=True)
    plt.show()


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--height", type=int, default=512)
    parser.add_argument("--width", type=int, default=512)
    args = parser.parse_args()

    gol = GameOfLife(**vars(args))
    show(gol)