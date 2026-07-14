/**
 * Animated hero background — the Figma "HeyTruffle_UI" gradient. Blurred colour
 * blobs (orange / purple / blue / magenta) plus the truffle silhouette on a
 * grained #251F21 base. Each blob drifts slowly via CSS (see .hero-b* rules in
 * globals.css) to match the prototype's living-gradient motion.
 */
export default function HeroBackground() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1920 1270"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
    >
      <g filter="url(#filter0_n_220_4709)">
        <g clipPath="url(#clip0_220_4709)">
          <rect width="2080" height="1270" transform="translate(-82)" fill="#251F21" />
          <g className="hero-blob hero-b1" filter="url(#filter1_f_220_4709)">
            <path fillRule="evenodd" clipRule="evenodd" d="M272.538 -53.5202C433.543 -53.6933 621.835 -131.664 731.321 -63.3825C841.516 5.34145 726.642 112.162 682.922 202.418C643.434 283.938 633.118 386.54 497.771 418.763C365.518 450.249 244.978 371.954 114.823 337.668C-22.0495 301.613 -201.866 298.6 -261.534 218.747C-330.013 127.1 -313.605 3.61674 -184.112 -62.3983C-63.9015 -123.681 112.301 -53.3479 272.538 -53.5202Z" fill="#EF7200" />
          </g>
          <g className="hero-blob hero-b2" filter="url(#filter2_f_220_4709)">
            <path fillRule="evenodd" clipRule="evenodd" d="M1.31482 343.242C169.179 343.069 365.493 265.099 479.643 333.38C594.533 402.104 474.764 508.925 429.182 599.181C388.012 680.7 377.257 783.303 236.143 815.526C98.2567 847.012 -27.4193 768.716 -163.119 734.431C-305.822 698.376 -493.3 695.363 -555.509 615.51C-626.906 523.863 -609.798 400.379 -474.788 334.364C-349.457 273.082 -165.748 343.415 1.31482 343.242Z" fill="#D592F3" />
          </g>
          <g className="hero-blob hero-b3" filter="url(#filter3_f_220_4709)">
            <path fillRule="evenodd" clipRule="evenodd" d="M1519.3 -21.7611C1727.37 -22.0793 1970.7 -165.418 2112.19 -39.8917C2254.6 86.4488 2106.14 282.826 2049.64 448.75C1998.61 598.613 1985.28 787.236 1810.37 846.474C1639.46 904.357 1483.68 760.42 1315.48 697.391C1138.6 631.108 906.218 625.569 829.109 478.768C740.612 310.287 761.817 83.2781 929.163 -38.0823C1084.51 -150.743 1312.22 -21.4444 1519.3 -21.7611Z" fill="#2F3D7C" />
          </g>
          <g className="hero-blob hero-b4" filter="url(#filter4_f_220_4709)">
            <path fillRule="evenodd" clipRule="evenodd" d="M1539.04 600.471C1710.24 600.152 1910.46 456.813 2026.88 582.34C2144.06 708.68 2021.91 905.057 1975.42 1070.98C1933.43 1220.84 1922.46 1409.47 1778.54 1468.71C1637.91 1526.59 1509.73 1382.65 1371.34 1319.62C1225.79 1253.34 1034.59 1247.8 971.141 1101C898.324 932.519 915.772 705.51 1053.47 584.149C1181.29 471.489 1368.65 600.787 1539.04 600.471Z" fill="#2F3D7C" />
          </g>
          <g className="hero-blob hero-b5" filter="url(#filter5_f_220_4709)">
            <path fillRule="evenodd" clipRule="evenodd" d="M902.901 582.497C892.612 675.054 989.092 795.649 886.654 847.726C783.551 900.141 642.011 817.158 518.931 777.698C407.764 742.058 265.27 719.834 229.161 636.932C193.877 555.926 311.012 499.086 367.367 429.731C426.629 356.796 442.596 253.933 557.923 232.325C690.283 207.524 861.514 236.565 945.159 321.469C1022.81 400.287 913.142 490.381 902.901 582.497Z" fill="#943E72" />
          </g>
          <g className="hero-blob hero-b6" filter="url(#filter6_f_220_4709)">
            <path fillRule="evenodd" clipRule="evenodd" d="M1013.14 37.8814C1106.26 37.7083 1215.17 -40.2622 1278.5 28.0191C1342.24 96.7431 1275.8 203.564 1250.51 293.82C1227.67 375.339 1221.7 477.942 1143.41 510.165C1066.92 541.651 997.195 463.356 921.912 429.07C842.744 393.015 738.735 390.002 704.223 310.149C664.614 218.502 674.105 95.0183 749.005 29.0033C818.536 -32.2792 920.454 38.0537 1013.14 37.8814Z" fill="#3773D7" />
          </g>
          <g className="hero-blob hero-b7" filter="url(#filter7_f_220_4709)">
            <path fillRule="evenodd" clipRule="evenodd" d="M701.076 860.72C794.204 860.547 903.114 782.577 966.442 850.858C1030.18 919.582 963.735 1026.4 938.447 1116.66C915.607 1198.18 909.64 1300.78 831.354 1333C754.857 1364.49 685.135 1286.19 609.852 1251.91C530.683 1215.85 426.675 1212.84 392.163 1132.99C352.553 1041.34 362.044 917.857 436.945 851.842C506.476 790.56 608.394 860.892 701.076 860.72Z" fill="#3773D7" />
          </g>
          <g className="hero-blob hero-b8" filter="url(#filter8_f_220_4709)">
            <path fillRule="evenodd" clipRule="evenodd" d="M272.538 785.632C433.543 785.459 621.835 707.489 731.321 775.77C841.516 844.494 726.642 951.315 682.922 1041.57C643.434 1123.09 633.118 1225.69 497.771 1257.92C365.518 1289.4 244.978 1211.11 114.823 1176.82C-22.0495 1140.77 -201.866 1137.75 -261.534 1057.9C-330.013 966.253 -313.605 842.769 -184.112 776.754C-63.9015 715.472 112.301 785.804 272.538 785.632Z" fill="#EF7200" />
          </g>
          <g className="hero-blob hero-b9" filter="url(#filter9_f_220_4709)">
            <path opacity="0.4" d="M1401.56 1525.6C1322.11 1518.4 1247.82 1480.63 1195.4 1429.52C1088.76 1325.57 1001.12 1211.63 904.876 1098.76C812.647 990.552 744.664 945.582 647.357 881.445C512.373 792.406 379.355 726.712 219.144 688.377C81.211 655.367 -54.7558 614.82 -175.734 545.44C-294.827 477.207 -347.085 348.605 -295.728 226.31C-246.42 108.765 -121.675 41.2695 14.62 85.3383C222.911 152.67 364.776 443.459 558.406 615.148C571.921 627.107 593.216 616.704 592.315 598.683C587.483 508.334 564.549 428.797 540.55 340.577C468.143 74.444 388.447 -239.69 652.272 -315.295C772.595 -349.78 900.371 -296.701 947.795 -173.587C1037.32 58.7987 834.107 317.724 778.082 600.895C774.642 618.342 793.727 631.448 808.88 622.192C866.543 586.724 910.855 544.048 959.426 496.702C1070.9 387.841 1182.71 274.474 1311.88 193.545C1446.53 109.175 1608.87 153.899 1676.61 279.635C1747.38 411.022 1693.89 566.082 1551.95 633.988C1343.25 733.921 1102.11 715.081 893.491 791.505C876.29 797.812 875.225 821.731 891.934 829.267C1117.92 931.329 1351.76 941.077 1545.8 1065.58C1640.41 1126.28 1687.75 1242.68 1653.43 1344.41C1619.11 1446.31 1530.32 1537.4 1401.56 1525.6Z" fill="#F6F3EC" />
            <path opacity="0.4" d="M326.442 982.455C481.494 959.766 609.679 1070.67 630.484 1204.44C653.746 1354.42 548.249 1490.89 410.726 1513.33C259.933 1537.9 129.127 1439.12 100.377 1299.54C70.2349 1153.32 166.395 1005.88 326.524 982.455H326.442Z" fill="#F6F3EC" />
          </g>
        </g>
      </g>
      <defs>
        <filter id="filter0_n_220_4709" x="-82" y="0" width="2080" height="1270" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="2 2" stitchTiles="stitch" numOctaves="3" result="noise" seed="3785" />
          <feComponentTransfer in="noise" result="coloredNoise1">
            <feFuncR type="linear" slope="2" intercept="-0.5" />
            <feFuncG type="linear" slope="2" intercept="-0.5" />
            <feFuncB type="linear" slope="2" intercept="-0.5" />
            <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " />
          </feComponentTransfer>
          <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
          <feComponentTransfer in="noise1Clipped" result="color1">
            <feFuncA type="table" tableValues="0 0.25" />
          </feComponentTransfer>
          <feMerge result="effect1_noise_220_4709">
            <feMergeNode in="shape" />
            <feMergeNode in="color1" />
          </feMerge>
        </filter>
        <filter id="filter1_f_220_4709" x="-701.28" y="-491.402" width="1879.02" height="1317.48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="200" result="effect1_foregroundBlur_220_4709" />
        </filter>
        <filter id="filter2_f_220_4709" x="-796.948" y="105.361" width="1524.99" height="917.478" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_220_4709" />
        </filter>
        <filter id="filter3_f_220_4709" x="577.745" y="-291.401" width="1794.44" height="1351.32" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_220_4709" />
        </filter>
        <filter id="filter4_f_220_4709" x="728.878" y="330.83" width="1547.37" height="1351.32" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_220_4709" />
        </filter>
        <filter id="filter5_f_220_4709" x="22.656" y="23.7814" width="1150.12" height="1040.8" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_220_4709" />
        </filter>
        <filter id="filter6_f_220_4709" x="431.233" y="-250" width="1124.12" height="1017.48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="125" result="effect1_foregroundBlur_220_4709" />
        </filter>
        <filter id="filter7_f_220_4709" x="119.173" y="572.839" width="1124.12" height="1017.48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="125" result="effect1_foregroundBlur_220_4709" />
        </filter>
        <filter id="filter8_f_220_4709" x="-701.28" y="347.751" width="1879.02" height="1317.48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="200" result="effect1_foregroundBlur_220_4709" />
        </filter>
        <filter id="filter9_f_220_4709" x="-415.42" y="-425.619" width="2223.14" height="2052.26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_220_4709" />
        </filter>
        <clipPath id="clip0_220_4709">
          <rect width="2080" height="1270" fill="white" transform="translate(-82)" />
        </clipPath>
      </defs>
    </svg>
  );
}
