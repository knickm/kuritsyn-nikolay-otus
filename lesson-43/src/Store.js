import { reactive } from 'vue'

export const store = {
  debug: true,

  state: reactive({
		numberLesson: 1,
		score: 0,
		maxScore: 0,
		duration: 1,
		complexity: 1,
		summation: true,
		difference: false,
		multiplication: false,
		division: false,
		exponentiation: false,
	}),
}
