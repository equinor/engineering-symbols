export class Vec2 {
	x: number;
	y: number;

	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	add(v: Vec2): Vec2 {
		return new Vec2(this.x + v.x, this.y + v.y);
	}

	sub(v: Vec2): Vec2 {
		return new Vec2(this.x - v.x, this.y - v.y);
	}

	mul(v: Vec2): Vec2 {
		return new Vec2(this.x * v.x, this.y * v.y);
	}

	div(v: Vec2): Vec2 {
		return new Vec2(this.x / v.x, this.y / v.y);
	}

	scale(s: number): Vec2 {
		return new Vec2(this.x * s, this.y * s);
	}

	dot(v: Vec2): number {
		return this.x * v.x + this.y * v.y;
	}

	length(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	normalize(): Vec2 {
		const len = this.length();
		return new Vec2(this.x / len, this.y / len);
	}

	distance(v: Vec2): number {
		return this.sub(v).length();
	}

	clone(): Vec2 {
		return new Vec2(this.x, this.y);
	}

	equals(v: Vec2): boolean {
		return this.x === v.x && this.y === v.y;
	}

	toString(): string {
		return `(${this.x}, ${this.y})`;
	}

	round(n = 1): Vec2 {
		return new Vec2(Math.round(this.x * n) / n, Math.round(this.y * n) / n);
	}

	floor(): Vec2 {
		return new Vec2(Math.floor(this.x), Math.floor(this.y));
	}

	ceil(): Vec2 {
		return new Vec2(Math.ceil(this.x), Math.ceil(this.y));
	}

	min(): number {
		return Math.min(this.x, this.y);
	}

	max(): number {
		return Math.max(this.x, this.y);
	}
}
