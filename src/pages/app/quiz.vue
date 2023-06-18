<template>
  <div class="container mx-auto p-4">
    <div class="mx-auto max-w-lg overflow-hidden rounded-lg bg-white shadow">
      <div class="px-4 py-5 sm:p-6">
        <CommonAlert
          type="success"
          message="'Čus more!'"
          label="'Nečum pičo'"
        />
        <CommonAlert
          type="warning"
          message="'Čus more!'"
          label="'Nečum pičo'"
        />
        <CommonAlert type="info" message="'Čus more!'" label="'Nečum pičo'" />
        <CommonAlert type="danger" message="'Čus more!'" label="'Nečum pičo'" />
        <p>
          Welcome to our beginner-friendly crypto investment application! Before
          you embark on your journey into the world of cryptocurrencies, we
          highly recommend taking our mandatory entry quiz. This quiz has been
          designed to provide you with essential knowledge and insights,
          empowering you to make informed investment decisions.
        </p>

        <p>
          Why is the quiz mandatory? We believe that education is the
          cornerstone of successful investing. By completing this quiz, you will
          acquire a fundamental understanding of key concepts, terminology, and
          strategies related to crypto investments. This knowledge will serve as
          a solid foundation for your future endeavors in the crypto market.
        </p>

        <p>
          Remember, investing in cryptocurrencies involves inherent risks, and
          we want to ensure that you have the necessary tools to navigate this
          exciting but volatile landscape. The quiz will not only help you avoid
          common pitfalls but also equip you with the confidence to make sound
          investment choices.
        </p>

        <p>
          Don't worry if you're new to cryptocurrencies or have limited
          knowledge; this quiz is specifically designed for beginners like you.
          It will guide you through the basics and help you grasp essential
          concepts step by step.
        </p>

        <p>
          Take the mandatory entry quiz now to unlock the full potential of our
          application. Embrace this opportunity to enhance your understanding
          and embark on your crypto investment journey with confidence. The
          knowledge you gain from this quiz will be invaluable as you navigate
          the world of digital assets.
        </p>

        <p>
          Remember, education is key, and this quiz is your first step towards
          becoming a well-informed crypto investor. Happy learning and
          successful investing!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<script lang="ts">
export default {
  name: 'AppQuizPage',
  layout: 'none'
}
</script>
