import { useState } from "react";
import { BiExport } from "react-icons/bi";


const Export = ({svgRef} : {svgRef: React.RefObject<SVGSVGElement>}) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const handleMouseEnter = () => {
        setDropdownVisible(true);
    }

    const handleMouseLeave = () => {
        setDropdownVisible(false);
    }
    const handleExport = async (ext: string) => {
        if (!svgRef.current) return; 
      
        const canvas = document.createElement('canvas');
        const svgSize = svgRef.current.getBoundingClientRect();
        canvas.width = svgSize.width;
        canvas.height = svgSize.height;
      
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          console.error('Error: Failed to get canvas context (Export)');
          return;
        }
      
        try {
          // Serialize SVG to string and create Blob
          const svgDataUrl = new XMLSerializer().serializeToString(svgRef.current);
          const svgBlob = new Blob([svgDataUrl], { type: 'image/svg+xml' });
      
          // Create an Image element and load the SVG
          const svgImage = new Image();
          svgImage.onload = () => {
              ctx.fillStyle = 'white';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(svgImage, 0, 0); 
            const imgDataUrl = canvas.toDataURL('image/png', 1.0);
      
            
            const link = document.createElement('a');
            link.href = imgDataUrl;
            link.download = `drawsome.${ext}`;
            link.click();
            URL.revokeObjectURL(svgBlob.toString()); 
          };
      
          svgImage.src = URL.createObjectURL(svgBlob);
        } catch (error) {
          console.error('Error exporting SVG:', error);
        }
      };
    return (
        <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="fixed top-4 right-8"
        >
            <div className="relative flex items-center cursor-pointer bg-gray-200 py-4 px-4 rounded-lg">
                <BiExport size={'1.5em'} style={{ opacity: 0.8 }} />
            </div>
            {
                isDropdownVisible && (
                    <div className="absolute right-0 w-40 rounded-md  ring-1 ring-black ring-opacity-5 ">
                        <ul>
                            <li className="cursor-pointer py-2 items-center px-4 hover:bg-gray-100" onClick={() => handleExport('jpg')}>JPG Format</li>
                            <li className="cursor-pointer py-2 items-center px-4 hover:bg-gray-100" onClick={() => handleExport('png')}>PNG Format</li>
                            <li className="cursor-pointer py-2 items-center px-4 hover:bg-gray-100" onClick={() => handleExport('tiff')}>TIFF Format</li>
                        </ul>
                    </div>
                )
            }
        </div>
    );
};

export default Export;