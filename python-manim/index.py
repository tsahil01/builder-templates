from manim import *
import numpy as np

class MyScene(Scene):
    def construct(self):
        rect1 = Rectangle(color=WHITE, width=0.5, height=0.5, fill_opacity=1).shift(LEFT * 5)
        rect2 = Rectangle(color=WHITE, width=0.5, height=0.5, fill_opacity=1).move_to([5, 0, 0])

        r1 = Rectangle(width=0.5, height=0.5, fill_opacity=1)
        r2 = Rectangle(width=0.5, height=0.5, fill_opacity=1)
        r3 = Rectangle(width=0.5, height=0.5, fill_opacity=1)
        r4 = Rectangle(width=0.5, height=0.5, fill_opacity=1)
        r5 = Rectangle(width=0.5, height=0.5, fill_opacity=1)

        group = VGroup(r1, r2, r3, r4, r5)
        group.arrange()
        group.set_color_by_gradient(RED, PURPLE, BLUE, GREEN, YELLOW)

        self.add(rect1)
        self.play(Write(rect2))
        self.play(rect2.animate.next_to(rect1, RIGHT))
        self.wait(1)

        group2 = VGroup(rect1, rect2)
        self.play(Transform(group2, group))

        s1 = SurroundingRectangle(group, color=WHITE)
        s2 = SurroundingRectangle(s1, color=WHITE)

        self.play(Write(s1), Write(s2, run_time=1.5))

        t = Text("1 2 3 4 5")
        t.next_to(s2, UP).scale(1.5)
        self.play(Write(t))

        self.play(Indicate(t[0], color=RED), Indicate(r1, color=RED, scale_factor=0.3))
        self.play(Indicate(t[1], color=RED), Indicate(r2, color=PURPLE, scale_factor=0.3))
        self.play(Indicate(t[2], color=RED), Indicate(r3, color=BLUE, scale_factor=0.3))
        self.play(Indicate(t[3], color=RED), Indicate(r4, color=GREEN, scale_factor=0.3))
        self.play(Indicate(t[4], color=RED), Indicate(r5, color=YELLOW, scale_factor=0.3))

        self.play(FadeOut(t), FadeOut(s1), FadeOut(s2))

        self.wait(1)