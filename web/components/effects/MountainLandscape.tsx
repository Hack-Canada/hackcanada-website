export default function MountainLandscape() {
  return (
    <div className="w-full flex flex-col" style={{ minHeight: "320px" }}>
      {/* Sky + Mountains */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: "clamp(170px, 28vh, 280px)",
          background:
            "linear-gradient(180deg, #f2a24c 0%, #f5b46a 45%, #f7c48e 100%), url(/sponsors/asdfasdfasdfasdfadsf%201.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "soft-light",
        }}
      >
        {/* Snowy peaks */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "88%",
            background:
              "linear-gradient(180deg, rgba(248, 239, 230, 0.95) 0%, rgba(240, 223, 209, 0.9) 65%, rgba(236, 214, 197, 0.85) 100%)",
            clipPath: `polygon(
              0% 100%, 0% 75%, 6% 55%, 12% 40%, 18% 25%, 24% 40%, 28% 55%, 32% 68%,
              36% 55%, 40% 42%, 44% 30%, 50% 20%, 56% 32%, 60% 46%, 64% 60%,
              70% 52%, 76% 36%, 82% 22%, 88% 36%, 94% 55%, 100% 70%, 100% 100%
            )`,
          }}
        />

        {/* Warm shadow planes on peaks */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "80%",
            background:
              "linear-gradient(180deg, rgba(216, 184, 169, 0.65) 0%, rgba(206, 166, 151, 0.55) 70%, rgba(197, 152, 138, 0.45) 100%)",
            clipPath: `polygon(
              10% 100%, 10% 72%, 16% 55%, 22% 38%, 28% 48%, 32% 62%, 36% 74%, 40% 60%,
              46% 46%, 52% 36%, 56% 42%, 60% 56%, 66% 68%, 72% 58%, 78% 40%, 84% 30%,
              88% 42%, 92% 60%, 96% 72%, 100% 80%, 100% 100%
            )`,
          }}
        />

        {/* Ridge line separating lake */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "18%",
            background:
              "linear-gradient(180deg, rgba(90, 58, 115, 0.65) 0%, rgba(75, 46, 95, 0.75) 60%, rgba(63, 37, 79, 0.85) 100%)",
            clipPath:
              "polygon(0% 45%, 12% 50%, 24% 46%, 36% 52%, 48% 48%, 60% 52%, 72% 49%, 84% 53%, 100% 50%, 100% 100%, 0% 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: "40%",
            background:
              "linear-gradient(180deg, rgba(247, 196, 142, 0) 0%, rgba(247, 196, 142, 0.25) 60%, rgba(140, 92, 136, 0.35) 100%)",
            mixBlendMode: "soft-light",
          }}
        />
      </div>

      {/* Lake reflection */}
      <div
        className="relative w-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(75, 43, 102, 0.95) 0%, rgba(55, 32, 85, 0.95) 40%, rgba(38, 22, 63, 0.98) 100%), url('/faq/full-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "soft-light",
          minHeight: "120px",
          flex: 1,
        }}
      >
        {/* Fade seam between ridge and lake */}
        <div
          className="absolute left-0 right-0 top-0"
          style={{
            height: "26px",
            background:
              "linear-gradient(180deg, rgba(63, 37, 79, 0.95) 0%, rgba(63, 37, 79, 0) 100%)",
          }}
        />
        {/* Soft aurora streaks */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(175, 140, 210, 0) 0%, rgba(175, 140, 210, 0.18) 18%, rgba(175, 140, 210, 0) 40%, rgba(145, 112, 190, 0.16) 60%, rgba(145, 112, 190, 0) 100%)",
            opacity: 0.7,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(173, 133, 210, 0.2) 0%, rgba(173, 133, 210, 0) 55%), linear-gradient(180deg, rgba(156, 118, 196, 0.25) 0%, rgba(112, 84, 156, 0.1) 50%, rgba(36, 18, 53, 0.85) 100%)",
            opacity: 0.85,
          }}
        />
      </div>
    </div>
  )
}
